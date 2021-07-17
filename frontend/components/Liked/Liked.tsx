import React from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from './Liked.module.scss'


const Liked = () => {
    const [isLoading] = useScroll()

    return <div className = {classes.liked}>
        <div className = {classes.liked__container}>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            {isLoading && 
                <div className = {classes.liked__loader}>
                    <LoaderIcon classModule = {classes.icon__loader}/>
                </div>
            }
        </div>
    </div>
}


export default Liked