import Image from 'next/image'
import { useEffect } from 'react'
import classes from "./videoPreview.module.scss"
import {convertDate} from "../../assets/functions/convertDate"
import {convertTitle} from "../../assets/functions/convertVideoTitlePreview"

const VideoPreview = () => { 
    useEffect(() => {    

    },[])
    return <div className = {classes.videoPreview}>
        <div className = {classes.videoPreview__container}>
            <div className = {classes.videoPreview__videoImage}>
                <Image src = {"/dog.jpg"} width = {350} height = {350}/>
            </div>
            <div className = {classes.videoPreview__info}>
                <div >
                    <Image layout = {'fixed'} className = {classes.videoPreview__avatar} src = {"/dog.jpg"} width = {35} height = {35}/>
                </div>
                <div className = {classes.videoPreview__bottomInfo}>
                    <div className = {classes.videoPreview__title}>
                        <span className = {`showTitle`}>{convertTitle()}</span>
                    </div>
                    <div className = {classes.videoPreview__username}>
                        <span className = {`showTitle`}>nicknamenicknamenicknamenicknamenicknameaaaa</span>
                    </div>
                    <div className = {classes.videoPreview__viewers}>
                        <span>1,2 тыс просмотров</span>
                        <div className = {classes.videoPreview__dot}></div>
                        <span>{convertDate()}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default VideoPreview;