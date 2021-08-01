import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
}

export const UserSchema = SchemaFactory.createForClass(User)
