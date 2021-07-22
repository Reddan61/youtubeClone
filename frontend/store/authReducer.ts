import { makeAutoObservable } from "mobx"


class Auth {
    isAuth = false
    user = null

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    async initialUser() {
        this.user = {
            id:"1",
            avatarSrc:"/imgTest.jpg"
        }
        this.isAuth = true
    }
}


export default new Auth()