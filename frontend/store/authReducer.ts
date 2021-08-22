import { makeAutoObservable } from "mobx"
import { auth } from "./API/API"


class Auth {
    isAuth = false
    user = null as IUser | null

    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    async initialUser() {
        const response = await auth.me()
        if(response.message === "success") {
            this.user = response.payload
            this.isAuth = true
        }
    }

    async checkEmail(email:string) {
        const response = await auth.checkEmail(email)

        return response
    }

    async registrationUser(form:IRegistarionForm) {
        const response = await auth.register(form) 

        return response
    }

    async confirmMail(code:string,userId:string) {
        const response = await auth.verify(code,userId)

        return response
    }

    async login(email:string,password:string) {
        const response = await auth.login(email,password)
        if(response.message === "success") {
            this.user = response.payload
            this.isAuth = true
        }

        return response
    }

    async logout() {
        const response = await auth.logout()

        if(response.message === "success") {
            this.user = null
            this.isAuth = false
        }

        return response
    }
}

export interface IRegistarionForm {
    name:string,
    secondName:string,
    email:string,
    password:string,
    passwordSub:string,
    showPassword: boolean
}

export interface IUser {
    _id:string,
    avatar:string | null,
    name:string,
    secondName:string,
    subscribersCount?:number
}


export default new Auth()