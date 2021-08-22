import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";
import MainLayout from "../components/MainLayout/MainLayout";
import MainVideos from "../components/MainVideos/MainVideos";
import globalHistoryReducer from "../store/globalHistoryReducer";
import videoListReducer, { IVideo } from "../store/videoListReducer";

const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const videos = props.videos as IVideo[]
    const totalPages = props.totalPages as number

    useEffect(() => {
        globalHistoryReducer.addUrl("main")
    },[])

    return <MainLayout>
        <MainVideos videos = {videos} totalPages = {totalPages}/>
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getMainVideos(1)
    
    return {
        props:{ 
            videos:[
                ...response.payload.videos
            ],
            totalPages: response.payload.totalPages
        }
    }
}

export default Index;