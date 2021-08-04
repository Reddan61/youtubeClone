import { RegisterVideoDto } from './dto/register-video.dto';
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as ffmpeg from "fluent-ffmpeg"
import * as moment from 'moment';
import { getVideoDurationInSeconds } from "get-video-duration"
import { IValidateJWT } from "src/auth/jwt.strategy";
import { UserService } from 'src/user/user.service';
import { Video, VideoDocument } from "./schemas/video.schema";


@Injectable()
export class VideosService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        private readonly userService:UserService
    ) {}
    
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

    async public(file:Express.Multer.File, info: RegisterVideoDto) {

        const videoResult = await this.videoModel.findById(info.videoId).exec()
        
        if(!videoResult || !file) {
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

    async screenshots(videoId:string):Promise<string[]> {
        const video = await this.videoModel.findById(videoId)

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
}