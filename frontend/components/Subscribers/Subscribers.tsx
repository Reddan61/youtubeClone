import React, { useEffect, useState } from "react"
import { useScroll } from "../Hook/useScroll"
import LoaderIcon from "../svg/LoaderIcon"
import VideoPreview from "../VideoPreview/VideoPreview"
import classes from "./Subscribers.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import videoListReducer, { IVideo } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    videos:IVideo[],
    totalPages:number
}

const Subscribers:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const videos = isBrowser ? videoListReducer.videos : props.videos

    
    const [isLoading] = useScroll(videoListReducer.addSubscribersVideos.bind(videoListReducer))


    useEffect(() => {
        videoListReducer.setInitialState(videos,props.totalPages)
        setBrowser(true)
    },[])
    
    return <div className = {classes.subscribers}>
        <div className = {`${classes.subscribers__container} ${!sideBarReducer.isOpenSideBar ? classes.subscribers__container_open : classes.subscribers__container_close}`}>
            {
                videos.map(el => {
                    return <VideoPreview key = {el._id} little = {true}
                        video = {el}
                    />
                })
            }
            
            
        </div>
        <div className = {classes.subscribers__loading}>
            {isLoading && 
                <LoaderIcon classModule = {classes.subscribers__loader}/>
            }
        </div>
    </div>
}

export default observer(Subscribers)