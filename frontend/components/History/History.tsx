import React from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from "./History.module.scss"


const History = () => {
    const [isLoading] = useScroll()

    return <div className = {classes.history}>
        <div className = {classes.history__container}>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            {isLoading && 
                <div className = {classes.history__loader}>
                    <LoaderIcon classModule = {classes.icon__loader}/>
                </div>
            }
        </div>
    </div>
}

export default History