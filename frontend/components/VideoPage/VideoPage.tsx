import React, { useState } from "react";
import classes from "./VideoPage.module.scss"
import Player from "../Player/Player";
import Rating from "../Rating/Rating";
import Save from "../Save/Save";
import VideoInfo from "./VideoInfo";

const VideoPage = () => {
    const [isAuth,setAuth] = useState(true)

    const convertViewers = (count:number) => {
        const countStr = String(count)
        let text = ""
        const [prelastNumber,lastNumber] = [Number(countStr[countStr.length - 2]),Number(countStr[countStr.length - 1])]
        if( lastNumber === 1 && prelastNumber !== 1) {
            text = "просмотр"
        } else if(lastNumber > 1 && lastNumber < 5 && prelastNumber !== 1 ) {
            text = "просмотра"
        } else {
            text = "просмотров"
        }
        return <>
            <span>{count.toLocaleString()}</span>
            <span>&nbsp;{text}</span>
        </>
    } 
    const convertDate = (date:Date) => {
        const monthArr = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]
        
        return `${date.getDate()} ${monthArr[date.getMonth()]}. ${date.getFullYear()} г.`
    }
    return <div className = {classes.videoPage}>
        <div className = {classes.videoPage__container}>
            <div className = {classes.videoPage__left}>
                <Player src = {'/testvideo.mp4'} />
                <div className = {classes.videoPage__info}>
                    <div className = {classes.videoPage__title}>
                        <h1 >Commodo duis elit veniam pariatur minim nulla culpa proident dolor incididunt consequat occaecat cupidatat. Nulla culpa amet enim magna laboris officia esse pariatur est laboris et minim commodo officia. Ullamco aliqua consectetur id exercitation pariatur. Veniam ex quis exercitation aliquip ad voluptate dolore pariatur laborum sunt sunt. </h1>
                    </div>
                    <div className = {`${classes.videoPage__subInfo}`}>
                        <div className = {classes.subInfo}>
                            {convertViewers(1200000)}
                            <div className = {classes.subInfo__dot}>
                                <div></div>
                            </div>
                            <span>{convertDate(new Date())}</span>
                        </div>
                        <div className = {classes.videoPage__add}>
                            <Rating likes = {1250} dislikes = {500} />
                            <Save id = {"1"}/>
                        </div>
                    </div>
                    <VideoInfo />
                </div>
                {isAuth && 
                    <div className = {classes.send}>
                        <div className = {classes.send__image}>
                            <img src={"/imgTest.jpg"} alt="img" width = {"100%"} height = {"100%"}/>
                        </div>
                        <div className = {classes.send__body}>
                            <div className = {classes.send__textarea}>
                                <textarea></textarea>
                            </div>
                            <div className = {classes.send__buttons}>
                                <button>Отмена</button>
                                <button>Оставить комментарий</button>
                            </div>
                        </div>
                    </div>
                }
                <div className = {classes.videoPage__comments}>
                    comments
                </div>
            </div>
            <div className = {classes.videoPage__right}>
                right
            </div>
        </div>
    </div>
}

export default VideoPage;