import React, { useEffect, useState } from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from './Later.module.scss'
import videoListReducer, { IVideo } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    videos:IVideo[],
    totalPages:number
}


const Later:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const [isLoading] = useScroll(videoListReducer.addLaterVideos.bind(videoListReducer))


    const videos = isBrowser ? videoListReducer.videos : props.videos

    useEffect(() => {
        videoListReducer.setInitialState(videos,props.totalPages)
        setBrowser(true)
    },[])
    
    return <div className = {classes.later}>
        <div className = {classes.later__container}>

            {
                videos.map(el => {
                    return <VideoPreview key = {el._id} list = {true}
                        video = {el}  
                    />
                })
            }

            {isLoading && 
                <div className = {classes.later__loader}>
                    <LoaderIcon classModule = {classes.icon__loader}/>
                </div>
            }
        </div>
    </div>
}


export default observer(Later)