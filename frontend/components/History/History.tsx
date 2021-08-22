import React, { useEffect, useState } from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from "./History.module.scss"
import videoListReducer, { IVideo } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    videos:IVideo[],
    totalPages:number
}


const History:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)

    const [isLoading] = useScroll(videoListReducer.addHistoryVideos.bind(videoListReducer))


    const videos = isBrowser ? videoListReducer.videos : props.videos

    useEffect(() => {
        videoListReducer.setInitialState(videos,props.totalPages)
        setBrowser(true)
    },[])

    return <div className = {classes.history}>
        <div className = {classes.history__container}>

            {
                videos.map(el => {
                    return <VideoPreview key = {el._id} list = {true}
                        video = {el} 
                    />
                })
            }

        </div>
        <div className = {classes.history__loader}>
            {isLoading && 
                <LoaderIcon classModule = {classes.icon__loader}/>
            }
        </div>
    </div>
}

export default observer(History)