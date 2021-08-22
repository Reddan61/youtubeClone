import { makeAutoObservable } from "mobx"
import { videosList } from "./API/API"
import { IUser } from "./authReducer"

class VideoListReducer {
    videos = [] as IVideo[]
    page = 1
    totalPages = 1

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    async setInitialState(videos:IVideo[],totalPages:number) {
        this.videos = videos
        this.totalPages = totalPages
        this.page = 1
    }

    async getMainVideos(page:number,name = "") {
        const response = await videosList.getMainVideos(page,name)

        if(response.message === "success") {
            this.videos = response.payload.videos
            this.totalPages = response.payload.totalPages
            this.page = 1
        }
        
        return response
    }

    async getSubscribersVideos(page:number,token = "") {
        const response = await videosList.getSubscribersVideos(page,token)
        
        if(response.message === "success") {
            this.videos = response.payload.videos
            this.totalPages = response.payload.totalPages
            this.page = 1
        }
        
        return response
    }

    async getHistoryVideos(page:number,token = "") {
        const response = await videosList.getHistoryVideos(page,token)
        
        if(response.message === "success") {
            this.videos = response.payload.videos
            this.totalPages = response.payload.totalPages
            this.page = 1
        }
        
        return response
    }

    async getLaterVideos(page:number,token = "") {
        const response = await videosList.getLaterVideos(page,token)
        
        if(response.message === "success") {
            this.videos = response.payload.videos
            this.totalPages = response.payload.totalPages
            this.page = 1
        }
        
        return response
    }

    async getLikedVideos(page:number,token = "") {
        const response = await videosList.getLikedVideos(page,token)
        
        if(response.message === "success") {
            this.videos = response.payload.videos
            this.totalPages = response.payload.totalPages
            this.page = 1
        }
        
        return response
    }

    async addMainVideos(name = "") {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await videosList.getMainVideos(++this.page,name)
        
        
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

    async addSubscribersVideos() {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await videosList.getSubscribersVideos(++this.page)
        
        
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

    async addHistoryVideos() {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await videosList.getHistoryVideos(++this.page)
        
        
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

    async addLaterVideos() {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await videosList.getLaterVideos(++this.page)
        
        
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

    async addLikedVideos() {
        if(this.page >= this.totalPages) {
            return
        }

        const response = await videosList.getLikedVideos(++this.page)
        
        
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


}


export interface IVideo {
    views:number,
    date: string,
    rating: {
        likes:number,
        dislikes:number
    },
    isPublicated:boolean,
    screenshots: string[],
    _id:string,
    author:IUser,
    url:string,
    description:string,
    name:string,
    previewImage:string,
    duration:number,
    isSavedLater?:boolean
}

export default new VideoListReducer()