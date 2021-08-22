import { makeAutoObservable } from "mobx";
import { profile, video } from "./API/API";
import { IUser } from "./authReducer";
import { IVideo } from "./videoListReducer";

class VideoReducer {
    video = null as IVideo | null
    comments = null as IComment[] | null
    totalPages = 1
    isSub = null as boolean | null
    userRating = 0 as userRatingType
    page = 1

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    async setInitialState(
            video:IVideo,userRating:userRatingType, isSub:boolean,
            comments: IComment[],totalPages:number
        ) {
        this.video = video
        this.isSub = isSub
        this.userRating = userRating
        this.comments = comments
        this.totalPages = totalPages
    }
    
    async publicateVideo(formData:FormData) {
        const response = await video.publicate(formData)

        return response
    }

    async getVideo(videoId:string) {
        const response = await video.getVideoById(videoId)

        if(response.message === "success") {
            this.video = response.payload.video
            this.isSub = response.payload.isSub
            this.userRating = response.payload.userRating
        }

        return response
    }

    async subscribe(userId:string) {
        const response = await profile.subscribe(userId)

        if(response.message === "success") {
            this.isSub = response.payload.isSub
        }
        return response
    }

    async rating(videoId:string,rating:1 | 2) {
        const response = await video.rating(videoId,rating)
        if(response.message === "success") {
            this.userRating = response.payload.rating
            this.video.rating = {
                likes:response.payload.likes,
                dislikes:response.payload.dislikes
            }
        }
        return response
    }


    async later(videoId:string) {
        const response = await video.later(videoId)
        if(this.video?._id === videoId) {
            this.video.isSavedLater = response.payload.isAdded
        }
        return response
    }

    async getComments(videoId:string,page = 1,token = "") {
        const response = await video.getComments(videoId,page,token)

        if(response.message === "success") {
            this.comments = response.payload.comments
            this.totalPages = response.payload.totalPages
        }
        
        return response
    }

    async addComments() {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await video.getComments(this.video._id,++this.page)
        
        if(response.message === "success") {
            this.comments.push(...response.payload.comments)
        
            this.totalPages = response.payload.totalPages

            //Если не пришло больше видео
            if(!response.payload.comments[0]) {
                this.totalPages = 0
            }
        }

        return response
    }

    async addComment(text:string) {
        const response = await video.addComment(this.video._id,text)

        if(response.message = "success") {
            this.comments.unshift(response.payload)
        }

        return response
    }

    async commentRating(commentId:string,rating: 1 | 2) {
        const response = await video.commentRating(commentId,rating)
        if(response.message === "success") {
            this.comments.forEach(el => el._id === commentId ? el.rating = response.payload : el)
        }

        return response
    }
}

export type userRatingType = 0 | 1 | 2

export interface IComment {
    date: string,
    rating: {
        likes: number,
        dislikes: number,
        rating?: userRatingType
    },
    _id: string,
    videoId: string,
    user: IUser,
    text: string,
}

export default new VideoReducer()