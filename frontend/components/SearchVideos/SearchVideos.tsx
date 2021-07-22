import React, { useEffect, useState } from "react"
import { useScroll } from "../Hook/useScroll"
import LoaderIcon from "../svg/LoaderIcon"
import VideoPreview from "../VideoPreview/VideoPreview"
import classes from "./SearchVideos.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import videoListReducer, { IVideoList } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    items:IVideoList[]
}

const SearchVideos:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const [isLoading] = useScroll(videoListReducer.addVideoList.bind(videoListReducer))

    const items = isBrowser ? videoListReducer.list : props.items

    useEffect(() => {
        videoListReducer.setInitialState(items,"search")
        setBrowser(true)
    },[])

    return <div className = {classes.searchVideos}>
        <div className = {classes.searchVideos__container}>
            {
                items.map(el => {
                    return <VideoPreview key = {el.id} list = {true}
                        id = {el.id} author = {el.author} date = {el.date} delay = {el.delay}
                        previewsSrc = {el.previewsSrc} userId = {el.userId} 
                        videoTitle = {el.videoTitle} viewersCount = {el.viewersCount} videoPreview = {el.videoPreview}
                    />
                })
            }
        </div>
        <div className = {classes.searchVideos__loading}>
            {isLoading && <LoaderIcon classModule = {classes.searchVideos__loader}/>}
        </div>
    </div>
}

export default observer(SearchVideos);