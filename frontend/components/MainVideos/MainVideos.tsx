import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import classes from "./mainVideos.module.scss"

interface IProps {
    isOpenSideBar :boolean
}

const MainVideos:React.FC<IProps> = ({isOpenSideBar}) => {
    const requestRef = useRef(false);
    
    const addNewVideosOnScroll = useCallback((e:Event) => {
        const percent = window.scrollY/window.innerHeight * 100
        if(percent >= 80 && requestRef.current === false) {
            requestRef.current = true;
            setTimeout(() => {
                requestRef.current = false;
            },1000)
        }
        
    },[])
    useEffect(() => {
        window.addEventListener("scroll",addNewVideosOnScroll)
        return () => {
            window.removeEventListener("scroll",addNewVideosOnScroll)
        }
    },[])
    return <div className = {classes.mainVideos}>
        <div className = {classes.mainVideos__container}>
            <div className = {`${classes.mainVideos__containerVideos} ${!isOpenSideBar ? classes.mainVideos__containerVideos_open : classes.mainVideos__containerVideos_close}`}>
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
                <VideoPreview />
            </div>
            <div className = {classes.mainVideos__loader}>
                loading
            </div>
        </div>
        
    </div>
}

export default MainVideos;