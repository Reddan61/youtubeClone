import { makeAutoObservable } from "mobx"

class VideoListReducer {
    list = [] as IVideoList[]
    listType = null as videoListType | null

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    setInitialState(list:IVideoList[],listType:videoListType) {
        this.listType = listType
        this.list = list
    }

    async getVideoList(listType:videoListType) {
        switch (listType) {
            case "main":
                this.list = initialListMainTest
            case "subscribers":
                this.list = initialListMainTest
            case "search":
                this.list = initialListMainTest
            case "liked":
                this.list = initialListMainTest
            case "history":
                this.list = initialListMainTest
            case "later":
                this.list = initialListMainTest
        }
        return {
            list:this.list
        }
    }

    async addVideoList() {
        await new Promise((resolve,reject) => { 
            setTimeout(() => {
                    this.list.push(...initialListMainTest)
                    resolve(true)
            },1000)
        })
    }
}

type videoListType = "main" | "subscribers" | "search" | "liked" | "history" | "later"


const initialListMainTest:IVideoList[] = [
    {
        id:"1",
        userId:"1",
        videoPreview:"/imgTest.jpg",
        previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
        videoTitle: "Title",
        author:"author",
        viewersCount:222222,
        date: String(new Date("2021-06-01")),
        delay: "11:33"
    },
    {
        id:"2",
        userId:"2",
        videoPreview:"/imgTest.jpg",
        previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
        videoTitle: "Title",
        author:"author",
        viewersCount:222222,
        date: String(new Date("2021-06-01")),
        delay: "11:33"
    },
    {
        id:"3",
        userId:"3",
        videoPreview:"/imgTest.jpg",
        previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
        videoTitle: "Title",
        author:"author",
        viewersCount:222222,
        date: String(new Date("2021-06-01")),
        delay: "11:33"
    },
    {
        id:"4",
        userId:"4",
        videoPreview:"/imgTest.jpg",
        previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
        videoTitle: "Title",
        author:"author",
        viewersCount:222222,
        date: String(new Date("2021-06-01")),
        delay: "11:33"
    },
    {
        id:"5",
        userId:"5",
        videoPreview:"/imgTest.jpg",
        previewsSrc: ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"],
        videoTitle: "Title",
        author:"author",
        viewersCount:222222,
        date: String(new Date("2021-06-01")),
        delay: "11:33"
    }
]

export interface IVideoList {
    id:string,
    userId:string,
    videoPreview:string,
    previewsSrc:string[],
    videoTitle:string,
    author:string,
    viewersCount:number,
    date:string,
    delay:string
}

export default new VideoListReducer()