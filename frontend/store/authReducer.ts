import { makeAutoObservable } from "mobx"


class Auth {
    isAuth = false
    user = null as IUser | null
    choosedEmail = null as string | null


    constructor() {
        makeAutoObservable(this,{},{deep:true})
    }

    async initialUser() {
        this.user = {
            id:"1",
            email:"fakeEmail@mail.ru",
            username:"fake user",
            avatarSrc:"/imgTest.jpg"
        }
        this.isAuth = true
    }

    async checkEmail(email:string) {
        this.choosedEmail = email
    }

    async registrationUser(form:IRegistarionForm) {
        const {email,name, secondName} = form
        const username = `${name} ${secondName}`
        //На api отправляет
        return new Promise((resolve,reject) => {
            this.user = {
                //Все с api
                id:"1",
                email:email,
                username,
                avatarSrc:"/imgTest.jpg"
            }
            resolve(true)
        })
    }

    async confirmMail(code:string) {
        //код на api
        this.initialUser()
    }
}

interface IRegistarionForm {
    name:string,
    secondName:string,
    email:string,
    password:string,
    passwordSub:string,
}

interface IUser {
    id:string,
    avatarSrc:string,
    username:string,
    email:string
}

export default new Auth()