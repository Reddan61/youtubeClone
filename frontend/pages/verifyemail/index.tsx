import React, { useEffect, useState } from "react"
import VerifyEmail from "../../components/Auth/VerifyEmail"
import Router from "next/router"
import router from "next/router"
import authReducer from '../../store/authReducer';
import { observer } from "mobx-react-lite";
import globalHistoryReducer from "../../store/globalHistoryReducer";

const Index = () => {
  
    const [showPage,setShowPage] = useState(false)

    useEffect(() => {
        if(globalHistoryReducer.history[globalHistoryReducer.history.length - 1] !== "register") {
            
            Router.push('/register')
        }
        globalHistoryReducer.addUrl("verifyemail")
        setShowPage(true)
    },[])
    return <>
        {
            showPage &&
            <VerifyEmail />
        }
    </>
}


export default Index