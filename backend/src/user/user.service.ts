import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async findByEmail(email:string) {
        const result = await this.userModel.find({email}).exec()
        return result
    }

    async createUser(user) {
        const createdUser = new this.userModel(user)
        const result = await createdUser.save()

        return result
    }

}