import React from "react"
import MainLayout from "../../components/MainLayout/MainLayout"
import VideoPage from "../../components/VideoPage/VideoPage"



const Index = () => {
    return <MainLayout onlyPortal = {true}>
        <VideoPage />
    </MainLayout>
}


export default Index