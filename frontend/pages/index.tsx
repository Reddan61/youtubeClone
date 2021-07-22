import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";
import MainLayout from "../components/MainLayout/MainLayout";
import MainVideos from "../components/MainVideos/MainVideos";
import globalHistoryReducer from "../store/globalHistoryReducer";
import videoListReducer, { IVideoList } from "../store/videoListReducer";

const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const list = props.list as IVideoList[]


    useEffect(() => {
        globalHistoryReducer.addUrl("main")
    },[])

    return <MainLayout>
        <MainVideos items = {list}/>
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getVideoList("main")

    return {
        props:{ 
            ...response
        }
    }
}

export default Index;