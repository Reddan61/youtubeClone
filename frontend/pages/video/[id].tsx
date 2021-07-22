import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import React, { useEffect } from "react"
import MainLayout from "../../components/MainLayout/MainLayout"
import VideoPage from "../../components/VideoPage/VideoPage"
import globalHistoryReducer from "../../store/globalHistoryReducer"
import videoReducer, { IVideo } from "../../store/videoReducer"


const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const video = props.video as IVideo

    useEffect(() => {
        globalHistoryReducer.addUrl("video")
    },[])
    
    return <MainLayout onlyPortal = {true}>
        <VideoPage id = {video.id} videoSrc = {video.videoSrc} subInfo = {video.subInfo} 
            title = {video.title} countViewers = {video.countViewers} date = {video.date}
            rating = {video.rating} isSaved = {video.isSaved} comments = {video.comments}
        />
    </MainLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await videoReducer.getVideo(context.params.id as string)

    return {
        props: {
            ...response
        }
    }
}

export default Index