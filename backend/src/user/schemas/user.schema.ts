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

    @Prop({
        required:true
    })
    verifyHash:string | null

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}]})
    uploadIds: Video[]

    @Prop({
        default:null
    })
    avatar:string | null

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
    ratingVideo: {
        videoId:string,
        rating:  0 | 1 | 2
    }[]

    @Prop({
        type: [
            {
                commentId: {
                    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
                },
                rating: {
                    type:Number
                }
            }
        ]
    })
    ratingComment: {
        commentId:string,
        rating:  0 | 1 | 2
    }[]


    @Prop({
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        required:true
    })
    subscribe: User[]


    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}]})
    later: Video[]

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}]})
    history: Video[]
}

export const UserSchema = SchemaFactory.createForClass(User)
