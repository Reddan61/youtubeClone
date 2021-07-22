import { makeAutoObservable } from "mobx"

class GlobalHistoryReducer {
    history = [] as string[]


    constructor() {
        makeAutoObservable(this)
    }

    addUrl(page:pagesNamesType) {
        this.history.push(page)
    }
}

type pagesNamesType = "main" | "subscribers" | "search" | "liked" | "history" | "later" | "login" | "register" | "video" | "verifyemail" | "profile"


export default new GlobalHistoryReducer()