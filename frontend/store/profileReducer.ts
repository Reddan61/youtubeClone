import { makeAutoObservable } from "mobx"
import { IVideoList } from "./videoListReducer"

class ProfileReducer {
    user = null as IProfile

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    setInitialState(user:IProfile) {
        this.user = user
    }

    async getUser(id:string) {
        this.user = {...fakeUser}
        
        return {
            user:this.user
        }
    }
    //Добавление еще видео в видео лист
    async addVideoList() {
        await new Promise((resolve,reject) => { 
            setTimeout(() => {
                    this.user.videoList.push(...fakeUser.videoList)
                    resolve(true)
            },1000)
        })
    }
}


const fakeUser = {
    id:"1",
    nickname:"nickname",
    avatarSrc:"/imgTest.jpg",
    subscribersCount:200124,
    videoList: [
        {
            id:"1",
            userId:"1",
            previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
            videoTitle: "Title",
             videoPreview:"/imgTest.jpg",
            author:"author",
            viewersCount:222222,
            date: String(new Date("2021-06-01")),
            delay: "11:33"
        },
        {
            id:"2",
            userId:"2",
            previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
            videoTitle: "Title",
             videoPreview:"/imgTest.jpg",
            author:"author",
            viewersCount:222222,
            date: String(new Date("2021-06-01")),
            delay: "11:33"
        },
        {
            id:"3",
            userId:"3",
            previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
            videoTitle: "Title",
             videoPreview:"/imgTest.jpg",
            author:"author",
            viewersCount:222222,
            date: String(new Date("2021-06-01")),
            delay: "11:33"
        },
        {
            id:"4",
            userId:"4",
            previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
            videoTitle: "Title",
             videoPreview:"/imgTest.jpg",
            author:"author",
            viewersCount:222222,
            date: String(new Date("2021-06-01")),
            delay: "11:33"
        },
        {
            id:"5",
            userId:"5",
            previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
            videoTitle: "Title",
             videoPreview:"/imgTest.jpg",
            author:"author",
            viewersCount:222222,
            date: String(new Date("2021-06-01")),
            delay: "11:33"
        }
    ]
}

export interface IProfile {
    id:string,
    nickname:string,
    avatarSrc:string,
    subscribersCount:number,
    videoList: IVideoList[]
}

export default new ProfileReducer()