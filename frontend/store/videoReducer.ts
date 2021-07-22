import { makeAutoObservable } from "mobx";

class VideoReducer {
    video = null as IVideo

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }
    
    setInitialState(video:IVideo) {
        this.video = {...video}
    }

    async getVideo(id:string) {
        this.video = {...fakeVideo}
        return {
            video:this.video
        }
    }

    async addComment() {
        await new Promise((resolve,reject) => { 
            setTimeout(() => {
                    this.video.comments.push(...fakeVideo.comments)
                    resolve(true)
            },1000)
        })
    }
}

const fakeVideo:IVideo = {
    id:"1",
    videoSrc: "/testvideo.mp4",
    title:"Title for video",
    countViewers:200154,
    date: String(new Date()),
    rating: {
        dislikes:120,
        likes:2500,
        rating:1
    },
    isSaved:true,
    subInfo: {
        userId:"1",
        avatarSrc:"/imgTest.jpg",
        isSub:true,
        nickname:"nickname",
        subscribersCount:450123,
        text:"Voluptate voluptate mollit incididunt veniam occaecat aute incididunt aliqua laborum ex."
    },
    comments: [
        {
            userId:"2",
            avatarSrc:"/imgTest.jpg",
            date:String(new Date()),
            dislikes:12,
            likes:50,
            nickname:"nickname comment",
            rating:2,
            text:"Fugiat amet et amet duis dolore cupidatat aliquip adipisicing nostrud occaecat in."
        },
        {
            userId:"3",
            avatarSrc:"/imgTest.jpg",
            date:String(new Date()),
            dislikes:12,
            likes:50,
            nickname:"nickname comment",
            rating:1,
            text:"Fugiat amet et amet duis dolore cupidatat aliquip adipisicing nostrud occaecat in."
        },
        {
            userId:"4",
            avatarSrc:"/imgTest.jpg",
            date:String(new Date()),
            dislikes:12,
            likes:50,
            nickname:"nickname comment",
            rating:0,
            text:"Fugiat amet et amet duis dolore cupidatat aliquip adipisicing nostrud occaecat in."
        },
        {
            userId:"5",
            avatarSrc:"/imgTest.jpg",
            date:String(new Date()),
            dislikes:12,
            likes:50,
            nickname:"nickname comment",
            rating:0,
            text:"Fugiat amet et amet duis dolore cupidatat aliquip adipisicing nostrud occaecat in."
        }
    ]
}



export interface IVideo {
    id:string,
    videoSrc:string,
    title:string,
    countViewers:number,
    date:string,
    rating:IRating,
    //Добавлено в смотреть позже
    isSaved:boolean,
    subInfo: IVideoSubInfo,
    comments: IComment[]
}
export interface IRating {
    likes:number,
    dislikes:number,
    // 0 - нет оценки/ 1 - лайк / 2 - дизлайк
    rating: 0 | 1 | 2
}

export interface IVideoSubInfo {
    userId:string,
    avatarSrc:string,
    nickname:string,
    subscribersCount:number,
    //Подписан?
    isSub:boolean,
    text:string
}

export interface IComment {
    userId:string,
    avatarSrc:string,
    nickname:string,
    date:string,
    text:string,
    likes:number,
    dislikes:number,
    rating: 0 | 1 | 2
}

export default new VideoReducer()