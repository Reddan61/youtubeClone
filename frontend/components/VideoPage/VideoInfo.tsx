import React, { useState } from "react";
import classes from "./VideoInfo.module.scss"
import Image from 'next/image'
import { convertCount } from "../../assets/functions/convertCount";
import Router from "next/router";
import { IVideoSubInfo } from "../../store/videoReducer";
import { convertAvatarSrc } from "../../assets/functions/convertAvatarSrc";
import authReducer from "../../store/authReducer";
import { observer } from "mobx-react-lite";

interface IProps {
    info: IVideoSubInfo
}

const VideoInfo:React.FC<IProps> = ({info}) => {
    const [isOpenText,setOpenText] = useState(false)

    const {avatarSrc,nickname,isSub,subscribersCount,text,userId} = info
    
    const subHandler = () => {
        //setSub(!isSub)
    }

    return <div className = {classes.videoInfo}>
        <div className = {classes.videoInfo__container}>
            <div className = {classes.videoInfo__top}>
                <div className = {classes.card}>
                    <div onClick = {() => Router.push(`/profile/${userId}`)} className = {classes.card__img}>
                        <img src = {convertAvatarSrc(avatarSrc)} width = {'100%'} height = {"100%"}/>
                    </div>
                    <div className = {classes.card__body}>
                        <div onClick = {() => Router.push(`/profile/${userId}`)} className = {classes.card__nickname}>
                            {nickname}
                        </div>
                        <div className = {classes.card__sub}>
                            {convertCount(subscribersCount,true)}
                        </div>
                    </div>
                </div>
                <div className = {`${classes.videoInfo__button} ${isSub && classes.videoInfo__button_active}`}>
                    {authReducer.isAuth && 
                        <button onClick = {subHandler}>{isSub?"Вы подписаны":"Подписаться"}</button>
                    }
                </div>
            </div>
            <div className = {`${classes.videoInfo__text} ${isOpenText && classes.videoInfo__text_active}`}>
               {text}
            </div>
            <div onClick = {() => setOpenText(!isOpenText)} className = {classes.videoInfo__bottom}>
                {isOpenText ? "Свернуть":"Ещё"}
            </div>
        </div>
    </div>
}


export default observer(VideoInfo)