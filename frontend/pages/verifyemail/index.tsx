import React, { useEffect, useState } from "react"
import VerifyEmail from "../../components/Auth/VerifyEmail"
import Router from "next/router"

const index = () => {
    const [userClicked,] = useState(true)
    useEffect(() => {
        if(!userClicked) {
            Router.push('/register')
        }
    },[])
    
    return <VerifyEmail />
}


export default index;