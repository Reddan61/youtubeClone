import { observer } from "mobx-react-lite";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react"
import History from "../../components/History/History"
import MainLayout from "../../components/MainLayout/MainLayout"
import NonAuth from "../../components/NonAuth/NonAuth"
import authReducer from '../../store/authReducer';
import globalHistoryReducer from "../../store/globalHistoryReducer";
import videoListReducer, { IVideo } from "../../store/videoListReducer";


const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const videos = props.videos as IVideo[]
    const totalPages = props.totalPages as number

    useEffect(() => {
        globalHistoryReducer.addUrl("history")
    },[])
    
    return <MainLayout>
        {authReducer.isAuth 
        ?
        <History videos = {videos} totalPages = {totalPages}/>
        : 
        <NonAuth />
       }
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getHistoryVideos(1,context.req.cookies.token)

    return {
        props:{ 
            videos:[
                ...response.payload.videos
            ],
            totalPages: response.payload.totalPages
        }
    }
}

export default observer(Index)