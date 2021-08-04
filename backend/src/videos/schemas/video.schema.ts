import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
    

}

export const VideoSchema = SchemaFactory.createForClass(Video)
