import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import React, { useEffect } from "react"
import MainLayout from "../../components/MainLayout/MainLayout"
import VideoPage from "../../components/VideoPage/VideoPage"
import { video } from "../../store/API/API"
import globalHistoryReducer from "../../store/globalHistoryReducer"
import { IVideo } from "../../store/videoListReducer"
import videoReducer, { IComment } from "../../store/videoReducer"


const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const video = props.video as IVideo
    const comments = props.comments as IComment[]
    const totalPages = props.totalPages

    const isSub = props.isSub
    const userRating = props.userRating

    useEffect(() => {
        globalHistoryReducer.addUrl("video")
    },[])
    
    return <MainLayout onlyPortal = {true}>
        <VideoPage 
            video = {video} isSub = {isSub} userRating = {userRating}
            comments = {comments} totalPages = {totalPages}
        />
    </MainLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const responseVideo = await video.getVideoById(context.params.id as string,context.req.cookies.token)
    const responseComments = await videoReducer.getComments(context.params.id as string, 1, context.req.cookies.token)

    if(responseVideo.message !== "success") {
        return {
            redirect: {
                destination: "/"
            },
            props: {}
        }
    }

    return {
        props: {
            video: {
                ...responseVideo.payload.video
            },
            comments: [...responseComments.payload.comments],
            totalPages: responseComments.payload.totalPages,
            isSub: responseVideo.payload.isSub,
            userRating: responseVideo.payload.userRating
        }
    }
}

export default Index