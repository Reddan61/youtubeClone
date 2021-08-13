import { IValidateJWT } from './../auth/jwt.strategy';
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getUserProfile(userId: string) {
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestException()
        }

        const result = await this.userModel.findById(userId).select(["uploadIds","avatar","_id","name","secondName"]).populate({path:"uploadIds",match: { isPublicated: true}}).exec()

        if(!result) {
            throw new BadRequestException()
        }

        return {
            message:"success",
            payload: result
        }
    }
    
    async getUserByHashCode(hash:string) {
        const result = await this.userModel.find({verifyHash:hash}).exec()

        return result
    }

    async findByEmail(email:string) {
        const result = await this.userModel.find({email}).exec()
        return result
    }

    async createUser(user) {
        const createdUser = new this.userModel(user)
        const result = await createdUser.save()

        return result
    }

    async addUpload(userId:string,videoId:string) {
        const result = await this.userModel.findOneAndUpdate(
            {_id:userId},
            {
                "$push":{
                    uploadIds:videoId
                }
            },{
                new:true
            }
        )

        return result
    }

    async avatar(file:Express.Multer.File,user:IValidateJWT) {
        if(!file) {
            throw new BadRequestException()
        }

        const result = await this.userModel.findByIdAndUpdate(user.userId, {
            avatar:file.path
        },
        {
            new:true
        }).select("avatar")


        return result
    }

    async activate(userId:string) {
        const result = await this.userModel.findByIdAndUpdate(userId, {
            isActivated:true,
            verifyHash:null
        })

        return {
            message:"success"
        }
    }

    async ratingVideo(user:IValidateJWT,videoId:string,rating: 1 | 2) {
        //const userFounded = await this.userModel.findById(user.userId).where('rating').elemMatch({"videoId": videoId}).select("rating").exec()
        const userFound = await this.userModel.findById(user.userId).exec()

        if(!userFound) {
            throw new BadRequestException()
        }

        const foundRating = userFound.ratingVideo.filter(el => String(el.videoId) === videoId)
        

        const newRating = foundRating[0] ? foundRating[0].rating === rating? 0 : rating : rating

        const oldRating = foundRating[0] ? foundRating[0].rating ? foundRating[0].rating : 0 : 0

    
        let result

        if(foundRating[0]) {
            result = await this.userModel.findByIdAndUpdate(user.userId,{
                "$set": {
                    "ratingVideo.$[inner].rating": newRating
                }
            }, {
                arrayFilters: [{ "inner.videoId": videoId}],
                upsert: true,
                new:true
            })
        } else {
            result = await this.userModel.findByIdAndUpdate(user.userId, {
                "$push" : {
                    ratingVideo: {
                        videoId,
                        rating:newRating
                    }
                }
            })
        }

        return {
            status:"success",
            payload: {
                userRating: newRating,
                oldRating
            }
        }
    }

    async ratingComment(user:IValidateJWT,commentId:string,rating: 1 | 2) {
        const userFound = await this.userModel.findById(user.userId).exec()

        if(!userFound) {
            throw new BadRequestException()
        }

        const foundRating = userFound.ratingComment.filter(el => String(el.commentId) === commentId)
        

        const newRating = foundRating[0] ? foundRating[0].rating === rating? 0 : rating : rating

        const oldRating = foundRating[0] ? foundRating[0].rating ? foundRating[0].rating : 0 : 0

    
        let result

        if(foundRating[0]) {
            result = await this.userModel.findByIdAndUpdate(user.userId,{
                "$set": {
                    "ratingComment.$[inner].rating": newRating
                }
            }, {
                arrayFilters: [{ "inner.commentId": commentId}],
                upsert: true,
                new:true
            })
        } else {
            result = await this.userModel.findByIdAndUpdate(user.userId, {
                "$push" : {
                    ratingComment: {
                        commentId,
                        rating:newRating
                    }
                }
            })
        }

        return {
            status:"success",
            payload: {
                userRating: newRating,
                oldRating
            }
        }
    }

    async deleteById(userId:string) {
        const result = await this.userModel.findByIdAndDelete(userId)

        return {
            message:"success"
        }
    }


    async getVideoUserRating(userId:string,videoId:string) {
        if(!userId) {
            throw new BadRequestException()
        }

        const user = await this.userModel.find({
            _id:userId,
            "ratingVideo.videoId": videoId
        }).exec()

        if(!user[0] || !user[0].ratingVideo[0]) {
            return 0
        }
        const userRatingArr = user[0].ratingVideo.filter(el => String(el.videoId) === String(videoId))

        if(!userRatingArr[0]) {
            return 0
        }

        return userRatingArr[0].rating
    }

    async getCommentUserRating(userId:string,commentsId:string[]) {

        const user = await this.userModel.findById(userId).exec()

        const ratedComments = user.ratingComment.filter(el => commentsId.includes(String(el.commentId)))

        return ratedComments
    }


    async subscribe(userId:string,by:IValidateJWT) {
        const user = await this.userModel.findById(by.userId).exec()

        const foundSub = user.subscribe.filter(el => String(el) === String(userId))

        if(!foundSub[0]) {
            await this.userModel.findByIdAndUpdate(by.userId, {
                "$push": {
                    subscribe: userId
                }
            })

            return {
                message:"success",
                payload: {
                    isSub:true
                }
            }
        }

        await this.userModel.findByIdAndUpdate(by.userId, {
            "$pullAll": {
                subscribe: [userId]
            }
        })

        return {
            message:"success",
            payload: {
                isSub:false
            }
        }
    }

    async getSubscribeIds(userId:string) {
        const user = await this.userModel.findById(userId).exec()

        const { subscribe } = user

        return subscribe
    }

    async getUploadsIds(userIds:User[]) {
        const ids = await this.userModel.find({
            "_id": {
                "$in": userIds
            }
        }).select(["uploadIds","-_id"]).exec()

        const result = ids.map(el => el.uploadIds)

        return result.flat(Infinity)
    }
}