import { RegisterVideoDto } from './dto/register-video.dto';
import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as ffmpeg from "fluent-ffmpeg"
import * as moment from 'moment';
import { join } from "path"
import { getVideoDurationInSeconds } from "get-video-duration"
import { createReadStream, statSync } from "fs"
import * as mongoose from 'mongoose'
import { IValidateJWT } from "src/auth/jwt.strategy";
import { UserService } from 'src/user/user.service';
import { Video, VideoDocument } from "./schemas/video.schema";
import { IncomingHttpHeaders } from 'http';
import { RatingVideoDto } from './dto/rating-video.dto';


@Injectable()
export class VideosService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        private readonly userService:UserService
    ) {}
    
    //загрузка видео
    async uploadVideo(file:Express.Multer.File,user:IValidateJWT) {
        if(!file) {
            throw new BadRequestException()
        }
        
        const createdVideo = new this.videoModel({
            url:file.path
        })
        const result = await createdVideo.save()

        if(!result) {
            throw new InternalServerErrorException()
        }

        const uploadedResult = await this.userService.addUpload(user.userId,result._id)

        if(!uploadedResult) {
            await this.delete(result._id)
            throw new InternalServerErrorException()
        }

        return {
            message:"success",
            payload: {
                id:result._id,
                url: result.url
            }
        }  
    }

    //публикация видео
    async public(file:Express.Multer.File, info: RegisterVideoDto) {
        if(!file) {
            throw new BadRequestException()
        }

        const screenshots = await this.screenshots(info.videoId)
        
        const result = await this.videoModel.findOneAndUpdate(
            {
                _id: info.videoId
            },
            {
                name:info.name,
                description:info.description,
                previewImage: file.path,
                screenshots: screenshots.map(el => `uploads\\${el}`),
                isPublicated:true
            },
            {
                new:true
            }
        )

        if(!result) {
            throw new InternalServerErrorException()
        }

        return {
            message:"success",
            payload: result
        }

    }

    async delete(videoId:string) {
       const result = await this.videoModel.findOneAndDelete({_id:videoId})

       return {
           message:"success",
           payload: result
       }
    }

    //Получение рандомных скриншотов из видео
    async screenshots(videoId:string):Promise<string[]> {
        const video = await this.videoModel.findById(videoId)

        if(!video) {
            throw new BadRequestException()
        }
        
        const duration = await this.getVideoDuration(video.url)
        let filenames = []
        let timestamps:number[] = []

        for(let i = 0;i < 4;i++) {
            timestamps.push(this.getRandomTimemarks(timestamps,duration))
        }

        const promise = new Promise((resolve,reject) => {
            ffmpeg(video.url)
            .on('error',(err) => {
                throw new InternalServerErrorException()
            })
            .on('filenames', function(names) {
                filenames.push(...names)
            })
            .on('end', () => {
                resolve(filenames)
            })
            .screenshots({
                filename:String(moment().format("DDMMYYYY-HHmmss-SSS")),
                count: 1,
                timestamps:timestamps.sort((a,b) => a - b),
                folder: 'uploads'
            })  
        })


        return promise as Promise<string[]>
    }

    async getVideoDuration(path:string) {
        const result = await getVideoDurationInSeconds(path)

        return result
    }

    getRandomTimemarks(arr:number[],max:number) {
        let count = Math.random() * (max - 0) + 0
        if(arr.includes(count)) {
            return this.getRandomTimemarks(arr,max)
        }
        return count
    }


    async stream(videoId:string,headers:IncomingHttpHeaders,res:any ) {
        const range = headers.range

        if(!range) {
            throw new BadRequestException("Requires Range Header")
        }

        if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
            throw new BadRequestException()
        }

        const video = await this.videoModel.findById(videoId).exec()

        if(!video || !video.isPublicated) {
            throw new BadRequestException()
        }

        const videoPath = join(process.cwd(),video.url)

        const videoSize = statSync(videoPath).size

        const CHUNK_SIZE = 10 ** 6
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

        const contentLength = end - start + 1
        const headerObj = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }

        res.writeHead(HttpStatus.PARTIAL_CONTENT,headerObj)

        const videoStream = createReadStream(videoPath, { start, end })
        
        videoStream.pipe(res)
    }

    async rating(user:IValidateJWT,body:RatingVideoDto) {
        if(!mongoose.Types.ObjectId.isValid(body.videoId)) {
            throw new BadRequestException()
        }

        const userRating = await this.userService.rating(user,body.videoId, body.rating)

        if(userRating.status !== "success") {
            throw new InternalServerErrorException()
        }

        const foundedVideo = await this.videoModel.findById(body.videoId)

        if(!foundedVideo) {
            throw new BadRequestException()
        }

        let newRatingObj = {...foundedVideo.rating}
        console.log(newRatingObj)
        console.log(userRating.payload)

        if(userRating.payload.oldRating === 0) {
            if(userRating.payload.userRating === 1) {
                newRatingObj.likes++
            } else if(userRating.payload.userRating === 2) {
                newRatingObj.dislikes++
            }
        }

        if(userRating.payload.oldRating === 2 && userRating.payload.userRating === 1 ) {
            newRatingObj.dislikes--
            newRatingObj.likes++
        }

        if(userRating.payload.oldRating === 1 && userRating.payload.userRating === 2 ) {
            newRatingObj.dislikes++
            newRatingObj.likes--
        }

        if(userRating.payload.oldRating === 1 && userRating.payload.userRating === 0 ) {
            newRatingObj.likes--
        }

        if(userRating.payload.oldRating === 2 && userRating.payload.userRating === 0 ) {
            newRatingObj.dislikes--
        }

        const result =  await this.videoModel.findByIdAndUpdate(body.videoId, {
            "$set" : {
                rating : {
                    ...newRatingObj
                }
            }
        },{
            new:true
        })

        return {
            message:"success",
            payload: {
                ...result.rating,
                rating: userRating.payload.userRating
            }
        }
    }
}