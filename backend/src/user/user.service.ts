import { IValidateJWT } from './../auth/jwt.strategy';
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { FilterQuery, LeanDocument, Model } from "mongoose";
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

    //Добавление id видео в загруженные
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

    //Смена аватарки
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

    //Верификация почты
    async activate(userId:string) {
        const result = await this.userModel.findByIdAndUpdate(userId, {
            isActivated:true,
            verifyHash:null
        })

        return {
            message:"success"
        }
    }

    //Изменение рейтинга для видео
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

    //Изменение рейтинга для коммента
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

    //Подписка/Отписка
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
        
        if(!user) {
            throw new BadRequestException()
        }

        const { subscribe } = user

        return subscribe
    }
    
    async getLaterIds(userId:string) {
        const user = await this.userModel.findById(userId).exec()

        if(!user) {
            throw new BadRequestException()
        }

        const { later } = user

        return later
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

    //Добавление / удаление смотреть позже
    async laterVideos(userId:string,videoId:string) {
        const user = await this.userModel.findById(userId).exec()

        const foundLaterIds = user.later.filter(el => String(el) === String(videoId))

        if(!foundLaterIds[0]) {
            await this.userModel.findByIdAndUpdate(userId, {
                "$push": {
                    later: videoId
                }
            })

            return {
                message:"success",
                payload: {
                    isAdded:true
                }
            }
        }

        await this.userModel.findByIdAndUpdate(userId, {
            "$pullAll": {
                later: [videoId]
            }
        })


        return {
            message:"success",
            payload: {
                isAdded: false 
            }
        }
    }

    //Получение списка подписок
    async getSubscribes(user:IValidateJWT,query) {
        const { page = 1 } = query

        
        const userFound = await this.userModel.findById(user.userId).exec()
        
        const pageSize = page <= 1 ? 7 : userFound.subscribe.length

        if(!userFound)
            throw new BadRequestException()

        const totalPages = Math.ceil(userFound.subscribe.length/pageSize)

        let skip = (page - 1) * pageSize < 0 ? totalPages * pageSize : (page - 1) * pageSize
            

        const limit = pageSize

        const subscribes = await this.userModel.find({
            "_id" : {
                "$in": userFound.subscribe
            }
        }).select(["avatar","name","secondName"]).limit(limit).skip(skip).exec()

        return {
            message:"success",
            payload: {
                subscribes
            }
        }
    }


    async getLikedIds(userId:string) {
        const user = await this.userModel.findById(userId).exec()

        if(!user) {
            throw new BadRequestException()
        }

        const { ratingVideo } = user

        
        const result = ratingVideo.filter(el => el.rating === 1).map(el => el.videoId)
        
        return result
    }

    async getHistoryIds(userId:string) {
        const user = await this.userModel.findById(userId).exec()

        if(!user) {
            throw new BadRequestException()
        }

        const { history } = user
        
        return history
    }

    async addToHistory(userId:string,videoId:string) {
        await this.userModel.findByIdAndUpdate(userId, {
            "$push": {
                history: videoId
            }
        })

        return {
            message:"success"
        }
    }

    async checkSubscribe(userId:string,myId:string) {
        const user = await this.userModel.findById(myId).exec()
        
        if(!user) {
            throw new BadRequestException()
        }

        const sub = user.subscribe.filter(el => String(el) === String(userId))

        return sub[0] ? true : false
    }

    async getUserByVideoId(videoId) {
        
        const user = await this.userModel.find({
            uploadIds: videoId
        }).select(["name","secondName","avatar"]).exec()

        if(!user) {
            throw new BadRequestException()
        }

        return user[0]
    }
}