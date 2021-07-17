import React, { useEffect, useState } from "react"
import VerifyEmail from "../../components/Auth/VerifyEmail"
import Router from "next/router"
import router from "next/router"

const index = () => {
    const [isAuth] = useState(true)
    const [showPage,setShowPage] = useState(false)
    const [userClicked,] = useState(true)
    useEffect(() => {
        if(isAuth) {
            router.push('/')
        } else {
            if(!userClicked) {
                Router.push('/register')
            } else {
                setShowPage(true)
            }
        }
      
    },[])
    return <>
    {
        showPage &&
        <VerifyEmail />
    }
    </>
}


export default index;