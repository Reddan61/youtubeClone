import React from "react";
import { useScroll } from "../Hook/useScroll";
import LoaderIcon from "../svg/LoaderIcon";
import VideoPreview from "../VideoPreview/VideoPreview";
import classes from "./Subscribers.module.scss"
interface IProps {
    isOpenSideBar? :boolean
}

const Subscribers:React.FC<IProps> = ({isOpenSideBar}) => {
    const [isLoading] = useScroll();
    
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
        <div className = {classes.subscribers__loading}>
            {isLoading && 
                <LoaderIcon classModule = {classes.subscribers__loader}/>
            }
        </div>
    </div>
}

export default Subscribers;