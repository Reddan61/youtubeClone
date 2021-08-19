import { makeAutoObservable } from "mobx"
import { IUser } from "./authReducer"

class VideoListReducer {
    list = [] as IVideo[]
    listType = null as videoListType | null

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    // setInitialState(list:IVideoList[],listType:videoListType) {
    //     this.listType = listType
    //     this.list = list
    // }

    // async getVideoList(listType:videoListType) {
    //     switch (listType) {
    //         case "main":
    //             this.list = initialListMainTest
    //         case "subscribers":
    //             this.list = initialListMainTest
    //         case "search":
    //             this.list = initialListMainTest
    //         case "liked":
    //             this.list = initialListMainTest
    //         case "history":
    //             this.list = initialListMainTest
    //         case "later":
    //             this.list = initialListMainTest
    //     }
    //     return {
    //         list:this.list
    //     }
    // }

    // async addVideoList() {
    //     await new Promise((resolve,reject) => { 
    //         setTimeout(() => {
    //                 this.list.push(...initialListMainTest)
    //                 resolve(true)
    //         },1000)
    //     })
    // }
}

type videoListType = "main" | "subscribers" | "search" | "liked" | "history" | "later"


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
    duration:number
}

export default new VideoListReducer()