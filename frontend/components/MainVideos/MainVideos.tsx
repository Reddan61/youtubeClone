import React, { useEffect, useState } from "react";
import { useScroll } from "../Hook/useScroll";
import LoaderIcon from "../svg/LoaderIcon";
import VideoPreview from "../VideoPreview/VideoPreview";
import classes from "./mainVideos.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import videoListReducer, { IVideoList } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite";

interface IProps {
    items:IVideoList[]
}

const MainVideos:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const [isLoading] = useScroll(videoListReducer.addVideoList.bind(videoListReducer))

    const items = isBrowser ? videoListReducer.list : props.items

    useEffect(() => {
        videoListReducer.setInitialState(props.items,"main")
        setBrowser(true)
    },[])
    
    return <div className = {classes.mainVideos}>
        <div className = {classes.mainVideos__container}>
            <div className = {`${classes.mainVideos__containerVideos} ${!sideBarReducer.isOpenSideBar ? classes.mainVideos__containerVideos_open : classes.mainVideos__containerVideos_close}`}>
                {
                    items.map(el => {
                        return <VideoPreview key = {el.id} 
                            id = {el.id} author = {el.author} date = {el.date} delay = {el.delay}
                            previewsSrc = {el.previewsSrc} userId = {el.userId} 
                            videoTitle = {el.videoTitle} viewersCount = {el.viewersCount} videoPreview = {el.videoPreview}
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