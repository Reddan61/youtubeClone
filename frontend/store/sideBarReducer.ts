import { makeAutoObservable } from "mobx"
import Subscribers from "../components/Subscribers/Subscribers"
import { sideBar } from "./API/API"

class SideBarReducer {
    //Открыт - false/Закрыт - true
    isOpenSideBar = false

    isOpenSideBarPortal = false

    subscribers = null as ISubsribersList[] | null

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

    async getSubscribes(page:number) {
       const response = await sideBar.getSubscribers(page)

       if(response.message === "success") {
           this.subscribers = response.payload.subscribes
           this.moreCountSub = response.payload.next
       }

       return response
    }

    // async addSubscribers() {
    //     this.subscribers.push(...this.subscribers)
    // }
}



export interface ISubsribersList {
    _id:string,
    name:string,
    secondName:string,
    avatar:string
}

export default new SideBarReducer()