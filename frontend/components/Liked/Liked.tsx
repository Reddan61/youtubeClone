import React, { useEffect, useState } from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from './Liked.module.scss'
import videoListReducer, { IVideo } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    videos:IVideo[],
    totalPages:number
}

const Liked:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    
    const videos = isBrowser ? videoListReducer.videos : props.videos

    
    const [isLoading] = useScroll(videoListReducer.addLikedVideos.bind(videoListReducer))

    useEffect(() => {
        videoListReducer.setInitialState(videos,props.totalPages)

        setBrowser(true)
    },[])
    
    return <div className = {classes.liked}>
        <div className = {classes.liked__container}>

            {
               videos.map(el => {
                    return <VideoPreview key = {el._id} list = {true}
                        video = {el}
                    />
                })
            }

            {isLoading && 
                <div className = {classes.liked__loader}>
                    <LoaderIcon classModule = {classes.icon__loader}/>
                </div>
            }
        </div>
    </div>
}


export default observer(Liked)