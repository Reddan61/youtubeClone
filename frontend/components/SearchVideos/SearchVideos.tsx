import React from "react"
import { useScroll } from "../Hook/useScroll"
import LoaderIcon from "../svg/LoaderIcon"
import VideoPreview from "../VideoPreview/VideoPreview"
import classes from "./SearchVideos.module.scss"


const SearchVideos = () => {
    const [isLoading] = useScroll()

    return <div className = {classes.searchVideos}>
        <div className = {classes.searchVideos__container}>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
            <VideoPreview list = {true}/>
        </div>
        <div className = {classes.searchVideos__loading}>
            {isLoading && <LoaderIcon classModule = {classes.searchVideos__loader}/>}
        </div>
    </div>
}

export default SearchVideos;