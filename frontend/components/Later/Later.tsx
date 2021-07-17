import React from 'react'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from './Later.module.scss'


const Later = () => {
    const [isLoading] = useScroll()

    return <div className = {classes.later}>
        <div className = {classes.later__container}>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            {isLoading && 
                <div className = {classes.later__loader}>
                    <LoaderIcon classModule = {classes.icon__loader}/>
                </div>
            }
        </div>
    </div>
}


export default Later