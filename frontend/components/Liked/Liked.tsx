import React, { useEffect, useState } from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from './Liked.module.scss'
import videoListReducer, { IVideoList } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"

interface IProps {
    items:IVideoList[]
}

const Liked:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)
    const [isLoading] = useScroll(videoListReducer.addVideoList.bind(videoListReducer))

    const items = isBrowser ? videoListReducer.list : props.items

    useEffect(() => {
        videoListReducer.setInitialState(props.items,"liked")
        setBrowser(true)
    },[])
    
    return <div className = {classes.liked}>
        <div className = {classes.liked__container}>

            {
               items.map(el => {
                    return <VideoPreview key = {el.id} list = {true}
                        id = {el.id} author = {el.author} date = {el.date} delay = {el.delay}
                        previewsSrc = {el.previewsSrc} userId = {el.userId} 
                        videoTitle = {el.videoTitle} viewersCount = {el.viewersCount} videoPreview = {el.videoPreview}
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