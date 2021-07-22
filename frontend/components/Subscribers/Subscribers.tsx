import React, { useEffect, useState } from "react"
import { useScroll } from "../Hook/useScroll"
import LoaderIcon from "../svg/LoaderIcon"
import VideoPreview from "../VideoPreview/VideoPreview"
import classes from "./Subscribers.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import videoListReducer, { IVideoList } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    items:IVideoList[]
}

const Subscribers:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const items = isBrowser ? videoListReducer.list : props.items
    
    const [isLoading] = useScroll(videoListReducer.addVideoList.bind(videoListReducer));


    useEffect(() => {
        videoListReducer.setInitialState(props.items,"subscribers")
        setBrowser(true)
    },[])
    
    return <div className = {classes.subscribers}>
        <div className = {`${classes.subscribers__container} ${!sideBarReducer.isOpenSideBar ? classes.subscribers__container_open : classes.subscribers__container_close}`}>
            {
                items.map(el => {
                    return <VideoPreview key = {el.id} little = {true}
                        id = {el.id} author = {el.author} date = {el.date} delay = {el.delay}
                        previewsSrc = {el.previewsSrc} userId = {el.userId} 
                        videoTitle = {el.videoTitle} viewersCount = {el.viewersCount} videoPreview = {el.videoPreview}
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