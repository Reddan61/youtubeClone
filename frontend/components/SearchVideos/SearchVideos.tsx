import React, { useEffect, useRef, useState } from "react"
import { useScroll } from "../Hook/useScroll"
import LoaderIcon from "../svg/LoaderIcon"
import VideoPreview from "../VideoPreview/VideoPreview"
import classes from "./SearchVideos.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import videoListReducer, { IVideo } from "../../store/videoListReducer"
import { observer } from "mobx-react-lite"
import  Router, { useRouter }  from "next/router"

interface IProps {
    videos:IVideo[],
    totalPages:number
}

const SearchVideos:React.FC<IProps> = (props) => {
    const [isBrowser,setBrowser] = useState(false)

    const router = useRouter()
 
    const [isLoading] = useScroll(videoListReducer.addMainVideos.bind(videoListReducer,router.query.search_query))

    const videos = isBrowser ? videoListReducer.videos : props.videos


    useEffect(() => {
        videoListReducer.setInitialState(videos,props.totalPages)
        setBrowser(true)
    },[])

    useEffect(() => {
        
        (async function() {
            await videoListReducer.getMainVideos(1,router.query.search_query as string)
        })() 

        console.log("USEEFFECT = " + router.query.search_query)
    },[router.query.search_query])

    return <div className = {classes.searchVideos}>
        <div className = {classes.searchVideos__container}>
            {
                videos.map(el => {
                    return <VideoPreview key = {el._id} list = {true}
                        video = {el}
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