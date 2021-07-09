import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import classes from "./Subscribers.module.scss"
interface IProps {
    isOpenSideBar :boolean
}

const Subscribers:React.FC<IProps> = ({isOpenSideBar}) => {
    return <div className = {classes.subscribers}>
        <div className = {`${classes.subscribers__container} ${!isOpenSideBar ? classes.subscribers__container_open : classes.subscribers__container_close}`}>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
            <VideoPreview little = {true}/>
           
        </div>
    </div>
}

export default Subscribers;