import React, { useEffect, useState } from "react"
import VerifyEmail from "../../components/Auth/VerifyEmail"
import router from "next/router"
import globalHistoryReducer from "../../store/globalHistoryReducer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const [showPage,setShowPage] = useState(false)

    useEffect(() => {
        const {email,id} = props
      
        if(!email || !id) {
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