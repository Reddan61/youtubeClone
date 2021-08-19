import axios from "axios";
import { IRegistarionForm } from "../authReducer";

export const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:8888/"
})


export const auth = {
    register: async (form: IRegistarionForm) => {
        try{
            const { showPassword, ...data } = form
    
            const response = await instance.post("auth/register",data)
            return {
                message:"success",
                data: response.data
            }
        }
        catch(e) {
            return {
                message:"error"
            }
        }
    },

    verify: async (code:string,userId:string) => {
        try {
            const response = await instance.patch("auth/verify",{
                code,
                userId
            })
            return response.data
        } 
        catch(e) {
            return {
                message:"error"
            }
        }
    },

    checkEmail: async ( email:string ) => {
        try {
            const response = await instance.get(`auth/check?email=${email}`)

            return response.data

        } catch(e) {
            return {
                message:"error"
            }
        }
    },

    login: async (email:string,password:string) => {
        try {
            const response = await instance.post(`auth/login`, {email,password})

            return response.data

        } catch(e) {
            return {
                message:"error"
            }
        }
    },

    me: async () => {
        try {
            const response = await instance.get(`auth/me`)

            return response.data

        } catch(e) {
            return {
                message:"error"
            }
        }
    },

    logout: async () => {
        try {
            const response = await instance.delete(`auth/logout`)
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}



export const video = {
    publicate: async (formData:FormData) => {
        try {
            const response = await instance.patch(`videos/upload`, formData)

            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}


export const profile = {
    getProfile: async (userId:string) => {
        try {
            const response = await instance.get(`user/profile/${userId}`)
           
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },

    getVideoProfile: async (userId:string,page:number) => {
        try {
            const response = await instance.get(`videos/upload?userId=${userId}&page=${page}`)
            
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },

    changeAvatar: async (file:File) => {
        try {
            const formData = new FormData()

            formData.set("file",file)

            const response = await instance.patch(`user/avatar`,formData)
            
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}


export const sideBar = {
    getSubscribers: async (page:number) => {
        try {
            const response = await instance.get(`user/subscribe?page=${page}`)
           
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}