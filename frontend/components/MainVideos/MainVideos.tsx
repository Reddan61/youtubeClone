import React, { useEffect, useState } from "react";
import { useScroll } from "../Hook/useScroll";
import LoaderIcon from "../svg/LoaderIcon";
import VideoPreview from "../VideoPreview/VideoPreview";
import classes from "./mainVideos.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import videoListReducer, { IVideo } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite";

interface IProps {
    videos:IVideo[],
    totalPages:number
}

const MainVideos:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const [isLoading] = useScroll(videoListReducer.addMainVideos.bind(videoListReducer))

    const videos = isBrowser ? videoListReducer.videos : props.videos

    useEffect(() => {
        videoListReducer.setInitialState(videos,props.totalPages)
        setBrowser(true)
    },[])
    
    return <div className = {classes.mainVideos}>
        <div className = {classes.mainVideos__container}>
            <div className = {`${classes.mainVideos__containerVideos} ${!sideBarReducer.isOpenSideBar ? classes.mainVideos__containerVideos_open : classes.mainVideos__containerVideos_close}`}>
                {
                    videos.map(el => {
                        return <VideoPreview key = {el._id}
                            video = {el}
                        />
                    })
                }
            </div>
            <div className = {classes.mainVideos__bottom}>
                {isLoading && 
                    <LoaderIcon classModule = {classes.mainVideos__loader}/>
                }
            </div>
        </div>
        
    </div>
}

export default observer(MainVideos);