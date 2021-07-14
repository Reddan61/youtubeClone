import React, { useState } from "react";
import classes from "./VideoInfo.module.scss"
import Image from 'next/image'
import { converCount } from "../../assets/functions/converCount";

const VideoInfo = () => {
    const [isAuth,setAuth] = useState(true)
    const [isSub,setSub] = useState(false)
    const [isOpenText,setOpenText] = useState(false)

    const subHandler = () => {
        setSub(!isSub)
    }

    return <div className = {classes.videoInfo}>
        <div className = {classes.videoInfo__container}>
            <div className = {classes.videoInfo__top}>
                <div className = {classes.card}>
                    <div className = {classes.card__img}>
                        <img src = {"/imgTest.jpg"} width = {'100%'} height = {"100%"}/>
                    </div>
                    <div className = {classes.card__body}>
                        <div className = {classes.card__nickname}>
                            Dolor do cupidatat cupidatat Lorem ullamco ea id. Nisi esse ullamco sunt eiusmod minim et. Labore voluptate reprehenderit laborum sint aute aliqua velit laboris ex nisi Lorem esse. Est aliqua labore consectetur laboris reprehenderit dolor consectetur qui commodo magna duis. Nulla magna irure Lorem dolor est minim tempor. Nisi sit exercitation nisi aliqua adipisicing aliqua irure. Irure ad do reprehenderit et ex elit culpa do occaecat do commodo.
                        </div>
                        <div className = {classes.card__sub}>
                            {converCount(150000,true)}
                        </div>
                    </div>
                </div>
                <div className = {`${classes.videoInfo__button} ${isSub && classes.videoInfo__button_active}`}>
                    {isAuth && 
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

const text = `A Blank GREEN Screen that lasts 10 hours in Full HD, 2D, 3D, 4D, and InterDimensional D.  

Use it for video testing or use it simply to look at the pretty blank screen.  

GREEN represents the heart chakra, located in the center of your chest. Focusing on the green and your heart chakra stimulates peace, love and nurturing.

Green is adaptable
Green is social
Green is calming 
Green is sympathetic
Green is compassionate 
Green is generous
Green is kind 
Green is loyal
Green represents moral sense 
Green represents growth
Green represents vitality 
Green represents renewal
Green represents restoration 
Green represents self-reliance 
Green represents reliability 
Green represents dependability
Green represents tactfulness
Green represents emotional balance
Green represents nature
Green represents family
Green represents practicality 
Green represents earth
Green represents nurturing`

export default VideoInfo