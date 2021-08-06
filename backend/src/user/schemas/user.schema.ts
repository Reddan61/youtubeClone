import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Video } from './../../videos/schemas/video.schema';


export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({
        required:true
    })
    name:string

    @Prop({
        required:true
    })
    secondName:string

    @Prop({
        required:true
    })
    email:string
    
    //Подтверждение почты
    @Prop({
        require:true,
        default:false
    })
    isActivated:boolean

    @Prop({
        required:true
    })
    passwordHash:string

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}]})
    uploadIds: Video[]

    @Prop({
        default:""
    })
    avatar:string

    @Prop({
        type: [
            {
                videoId: {
                    type: mongoose.Schema.Types.ObjectId, ref: 'Video'
                },
                rating: {
                    type:Number
                }
            }
        ]
    })
    rating: {
        videoId:string,
        rating:  0 | 1 | 2
    }[]

}

export const UserSchema = SchemaFactory.createForClass(User)
