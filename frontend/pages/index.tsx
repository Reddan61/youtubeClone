import React, { useState } from "react";
import HeaderLayout from "../components/HeaderLayout/HeaderLayout"
import MainVideos from "../components/MainVideos/MainVideos";
import SideBarLayout from "../components/SideBar/SideBarLayout"
import VideoPreview from "../components/VideoPreview/VideoPreview";

const Index = () => {
    //Открыт - false/Закрыт - true
    const [isOpenSideBar, setOpenSideBar] = useState(false);
    const [isOpenSideBarPortal, setOpenSideBarPortal] = useState(false);

    return <HeaderLayout setOpenSideBar = {setOpenSideBar} setOpenSideBarPortal = {setOpenSideBarPortal}>
        <SideBarLayout 
            setOpenSideBarPortal = {setOpenSideBarPortal} 
            isOpenSideBarPortal = {isOpenSideBarPortal} 
            isOpenSideBar = {isOpenSideBar} 
        >
            <MainVideos />
        </SideBarLayout>  
    </HeaderLayout>
}


export default Index;