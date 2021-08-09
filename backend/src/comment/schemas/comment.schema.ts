import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Video } from "src/videos/schemas/video.schema";
import { User } from "src/user/schemas/user.schema";

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video',
        required:true
    })
    videoId: Video

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    })
    userId: User

    @Prop({
        required:true
    })
    text:string

    @Prop({
        type:Object,
        default: {
            likes:0,
            dislikes:0
        }
    })
    rating: {
        likes:number,
        dislikes:number
    }
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
