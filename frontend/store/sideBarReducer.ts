import { makeAutoObservable } from "mobx"
import Subscribers from "../components/Subscribers/Subscribers"

class SideBarReducer {
    //Открыт - false/Закрыт - true
    isOpenSideBar = false

    isOpenSideBarPortal = false

    subscribers = [] as ISubsribersList[]

    moreCountSub = 0

    constructor() {
        makeAutoObservable(this)
    }

    changeOpenSideBar() {
        this.isOpenSideBar = !this.isOpenSideBar
    }

    changeOpenSideBarPortal() {
        this.isOpenSideBarPortal = !this.isOpenSideBarPortal
    }

    async getInitialSub() {
        this.subscribers = [...initialSub]
        this.moreCountSub = 100 - initialSub.length 
    }
    async addSubscribers() {
        this.subscribers.push(...this.subscribers)
    }
}


const initialSub = [
    {
        userId:"1",
        nickname:"nick1",
        avatarSrc:"/imgTest.jpg"
    },
    {
        userId:"2",
        nickname:"nick2",
        avatarSrc:"/imgTest.jpg"
    },
    {
        userId:"3",
        nickname:"nick3",
        avatarSrc:"/imgTest.jpg"
    },
    {
        userId:"4",
        nickname:"nick4",
        avatarSrc:"/imgTest.jpg"
    }
]

export interface ISubsribersList {
    userId:string,
    nickname:string,
    avatarSrc:string
}

export default new SideBarReducer()