import { IUser } from './authReducer';
import { profile } from './API/API';
import { makeAutoObservable } from "mobx"
import { IVideo } from "./videoListReducer"

class ProfileReducer {
    user = null as IProfile
    videos = null as IVideo[] | null
    page = 1
    totalPages = 1

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    setInitialState(user:IProfile,videos:IVideo[],totalPages) {
        this.user = user
        this.videos = videos
        this.totalPages = totalPages
        this.page = 1
    }

    async getUser(userId:string) {
        const response = await profile.getProfile(userId)

        //for server render
        if(response.message === "success") {
            this.user = response.payload
        }
        
        return response
    }


    async getVideoProfile(page:number) {
        const response = await profile.getVideoProfile(this.user._id,page)

        if(response.message === "success") {
            this.videos = response.payload.videos
            this.totalPages = response.payload.totalPages
        }

        return response
    }

    async addVideoProfile() {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await profile.getVideoProfile(this.user._id,++this.page)

        if(response.message === "success") {
            this.videos.push(...response.payload.videos)
     
            this.totalPages = response.payload.totalPages

            //Если не пришло больше видео
            if(!response.payload.videos[0]) {
                this.totalPages = 0
            }
        }

        return response
    }
  
    async changeAvatar(file:File) {
        const response = await profile.changeAvatar(file)

        if(response.message === "success") {
            this.user.avatar = response.payload.avatar
        }

        return response
    }
}



export interface IProfile {
    _id:string,
    name:string,
    secondName:string,
    avatar:string,
    subscribersCount:number
}

export default new ProfileReducer()