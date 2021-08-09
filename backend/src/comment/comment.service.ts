import { IValidateJWT } from './../auth/jwt.strategy';
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CommentDocument, Comment } from './schemas/comment.schema';
import { AddCommentDto } from './dto/add-comment.dto';
import { VideosService } from 'src/videos/videos.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) {}

    async addComment(body:AddCommentDto,user:IValidateJWT) {
        const createdComment = new this.commentModel({
            videoId:body.videoId,
            userId: user.userId,
            text: body.text
        })
        
        const result = await createdComment.save()

        if(!result) {
            throw new InternalServerErrorException()
        }

        return {
            message:"success",
            payload: result
        }
    }

    async getComments(videoId:string, page:number) {
        const pageSize = 20
        
        const totalComments = await this.commentModel.countDocuments({videoId} as FilterQuery<Comment>).exec()
        const totalPages = Math.ceil(totalComments/pageSize)

        let skip = (page - 1) * pageSize < 0 ? totalPages * pageSize : (page - 1) * pageSize
            

        const limit = pageSize

        const result = await this.commentModel.find({videoId} as FilterQuery<Comment> ).limit(limit).skip(skip).exec()

        return {
            message:"success",
            payload: {
                comments:result,
                totalPages
            }
        }
    }


    async rating(commentId:string,commentRating) {
        const foundComment = await this.commentModel.findById(commentId)

        if(!foundComment) {
            throw new BadRequestException()
        }

        let newRatingObj = {...foundComment.rating}
       

        if(commentRating.payload.oldRating === 0) {
            if(commentRating.payload.userRating === 1) {
                newRatingObj.likes++
            } else if(commentRating.payload.userRating === 2) {
                newRatingObj.dislikes++
            }
        }

        if(commentRating.payload.oldRating === 2 && commentRating.payload.userRating === 1 ) {
            newRatingObj.dislikes--
            newRatingObj.likes++
        }

        if(commentRating.payload.oldRating === 1 && commentRating.payload.userRating === 2 ) {
            newRatingObj.dislikes++
            newRatingObj.likes--
        }

        if(commentRating.payload.oldRating === 1 && commentRating.payload.userRating === 0 ) {
            newRatingObj.likes--
        }

        if(commentRating.payload.oldRating === 2 && commentRating.payload.userRating === 0 ) {
            newRatingObj.dislikes--
        }

        const result =  await this.commentModel.findByIdAndUpdate(commentId, {
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
                rating: commentRating.payload.userRating
            }
        }
    }
}