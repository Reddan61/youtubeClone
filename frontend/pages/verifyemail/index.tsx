import React, { useEffect, useState } from "react"
import VerifyEmail from "../../components/Auth/VerifyEmail"
import Router, { useRouter } from "next/router"
import router from "next/router"
import authReducer from '../../store/authReducer';
import { observer } from "mobx-react-lite";
import globalHistoryReducer from "../../store/globalHistoryReducer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const [showPage,setShowPage] = useState(false)

    useEffect(() => {
        const {email,hash} = props
      
        if(!email || !hash) {
            router.push("/register")
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


export const getServerSideProps:GetServerSideProps = async (context) => {
    const query = context.query

    return {
        props:{ 
            ...query
        }
    }
}


export default Index