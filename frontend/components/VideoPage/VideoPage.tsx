import React, { useCallback, useEffect, useRef, useState } from "react";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";
import classes from "./VideoPage.module.scss"
import {CSSTransition} from "react-transition-group"
import Player from "../Player/Player";

const VideoPage = () => {

    return <div className = {classes.videoPage}>
        <div className = {classes.videoPage__container}>
            <div className = {classes.videoPage__left}>
                <Player src = {'/testvideo.mp4'} />
                <div className = {classes.videoPage__info}>
                    info
                </div>
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