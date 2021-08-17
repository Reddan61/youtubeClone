import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose"
import { User } from "src/user/schemas/user.schema";

export type VideoDocument = Video & Document

@Schema()
export class Video {
    @Prop({
        required:true
    })
    url:string

    @Prop()
    name:string
    
    @Prop()
    description:string
    
    @Prop()
    previewImage:string
    
    @Prop()
    screenshots:string[]
    
    @Prop({
        required:true,
        default:false
    })
    isPublicated:boolean
    
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

    @Prop({
        default: new Date()
    })
    date:Date

    @Prop({
        type:Number,
        default:0
    })
    views:number

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    })
    author: User
}

export const VideoSchema = SchemaFactory.createForClass(Video)
