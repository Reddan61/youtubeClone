import React, { useEffect, useRef, useState } from "react";
import classes from "./VideoInfo.module.scss"
import Image from 'next/image'
import { convertCount } from "../../assets/functions/convertCount";
import Router from "next/router";
import { convertAvatarSrc } from "../../assets/functions/convertAvatarSrc";
import authReducer, { IUser } from "../../store/authReducer";
import { observer } from "mobx-react-lite";
import videoReducer from "../../store/videoReducer";

interface IProps {
    author: IUser,
    isSub:boolean,
    description:string,
}

const VideoInfo:React.FC<IProps> = ({author,description,isSub}) => {
    const [isOpenText,setOpenText] = useState(false)
    const [isHugeDescription, setHugeDescription] = useState(false)
    const descriptionRef = useRef<HTMLDivElement>(null)

    const subHandler = async () => {
        const response = await videoReducer.subscribe(author._id)

        if(response.message !== "success") {
            alert("Что-то пошло не так!")
        }
    }

    useEffect(() => {
        if(descriptionRef.current.scrollHeight !== descriptionRef.current.offsetHeight
            && descriptionRef.current.scrollHeight >= descriptionRef.current.offsetHeight
        ) {
            setHugeDescription(true)
        }
    },[])

    return <div className = {classes.videoInfo}>
        <div className = {classes.videoInfo__container}>
            <div className = {classes.videoInfo__top}>
                <div className = {classes.card}>
                    <div onClick = {() => Router.push(`/profile/${author._id}`)} className = {classes.card__img}>
                        <img src = {convertAvatarSrc(author.avatar)} width = {'100%'} height = {"100%"}/>
                    </div>
                    <div className = {classes.card__body}>
                        <div onClick = {() => Router.push(`/profile/${author._id}`)} className = {classes.card__nickname}>
                            {`${author.name} ${author.secondName}`}
                        </div>
                        <div className = {classes.card__sub}>
                            {convertCount(author.subscribersCount,true)}
                        </div>
                    </div>
                </div>
                <div className = {`${classes.videoInfo__button} ${isSub && classes.videoInfo__button_active}`}>
                    {authReducer.isAuth && 
                        <button onClick = {subHandler}>{isSub?"Вы подписаны":"Подписаться"}</button>
                    }
                </div>
            </div>
            <div ref = {descriptionRef} className = {`${classes.videoInfo__text} ${isOpenText && classes.videoInfo__text_active}`}>
               {description}
            </div>
            {
                isHugeDescription &&
                <div onClick = {() => setOpenText(!isOpenText)} className = {classes.videoInfo__bottom}>
                    {isOpenText ? "Свернуть":"Ещё"}
                </div>
            }
        </div>
    </div>
}


export default VideoInfo