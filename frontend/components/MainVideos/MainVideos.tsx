import React from "react";
import { useScroll } from "../Hook/useScroll";
import LoaderIcon from "../svg/LoaderIcon";
import VideoPreview from "../VideoPreview/VideoPreview";
import classes from "./mainVideos.module.scss"

interface IProps {
    isOpenSideBar? :boolean
}

const MainVideos:React.FC<IProps> = ({isOpenSideBar}) => {
    const [isLoading] = useScroll();


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
            <div className = {classes.mainVideos__bottom}>
                {isLoading && 
                    <LoaderIcon classModule = {classes.mainVideos__loader}/>
                }
            </div>
        </div>
        
    </div>
}

export default MainVideos;