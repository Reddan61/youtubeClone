import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import PauseIcon from '../svg/PauseIcon'
import PlayIcon from '../svg/PlayIcon'
import classes from "./Player.module.scss"

interface IProps {
    src:string
}


const Player:React.FC<IProps> = ({src}) => {
    const [isPlaying,setIsPlaying] = useState(false)
    const [duration,setDuration] = useState(["00:00","00:00"])
    const [isVisibleControls,setVisibleControls] = useState(false)

    const progressBarRef = useRef<HTMLDivElement>(null)
    const progressMaskRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePlay  = useCallback(() => {
        setIsPlaying(state => {
            if(state) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            return !state
        })
    },[])

    const initializeVideo = useCallback(() => {
        setDuration(state => {
            return [state[0],convertDuration(videoRef.current.duration)]
        })
    },[])

    const convertDuration = (time:number) => { 
        const videoDuration = Math.round(time)
        const minutes = (videoDuration/60) < 1 ? 0 :videoDuration/60
        const seconds = (videoDuration%60) < 1 ? 0 : videoDuration%60

        return `${minutes<10 ? `0${minutes}` :minutes }:${seconds<10?`0${seconds}`:seconds}`;
    }

    const endedVideo = useCallback(() => {
        setIsPlaying(false)
        if(progressBarRef && progressBarRef.current) {
            progressBarRef.current.style.width = 100 + "%"
        }
        setDuration(state => {
            return [convertDuration(videoRef.current.duration),state[1]]
        })
    },[])

    const timeUpdateVideo = useCallback(() => {
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
        if(progressBarRef && progressBarRef.current) {
            progressBarRef.current.style.width = percent + "%"
        }

        setDuration(state => {
            return [convertDuration(videoRef.current.currentTime),state[1]]
        })
    },[])
    const progressBarSkip = useCallback((e:any) => {
        const position = e.clientX - e.target.getBoundingClientRect().left
        const widthBar = progressMaskRef.current.offsetWidth
        const percent = (position/widthBar)*100
        const currentTimeSeconds = (videoRef.current.duration/100) * percent
        videoRef.current.currentTime = currentTimeSeconds    
    },[])

    const hoverBlock = () => {
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100

        setTimeout(() => {
            if(progressBarRef && progressBarRef.current) {
                progressBarRef.current.style.width = percent + "%"
            }
        },0)
        
        setVisibleControls(true)
        
    }
    //калькулятор высоты 16:9
    const calculateHeight = useCallback(() => {
        const video = videoRef.current
        const width = video.offsetWidth
        const height = width / 1.78 
        video.style.height = height + "px" 
    },[])

    useEffect(() => {
        const video = videoRef.current
        calculateHeight()
        let interval = setInterval(() => {
            if(video.readyState > 0) {
                initializeVideo()
                clearInterval(interval)
            }            
        },500)
        video.addEventListener("click",togglePlay);
        video.addEventListener("loadedmetadata",initializeVideo);
        video.addEventListener("ended",endedVideo);
        video.addEventListener("timeupdate",timeUpdateVideo);
        window.addEventListener('resize',calculateHeight)
        return () => {
            video.removeEventListener("click",togglePlay);
            video.removeEventListener("loadedmetadata",initializeVideo);
            video.removeEventListener("ended",endedVideo);
            video.removeEventListener("timeupdate",timeUpdateVideo);
            window.removeEventListener('resize',calculateHeight)
        }
    },[])
    
    return <div onMouseMove = {() => {
        if(!isVisibleControls) {
            setVisibleControls(true)
        }
    }} onMouseLeave = {() => setVisibleControls(false)} onMouseEnter = {hoverBlock} className = {classes.player}>
        <CSSTransition in = {isVisibleControls} timeout = {300} unmountOnExit
            classNames = {{
                enter:classes.animation__enter,
                enterActive:classes.animation__enter_active,
                exit:classes.animation__exit,
                exitActive:classes.animation__exit_active
            }}
        >         
            <div className = {classes.player__controls}>
                <div ref = {progressMaskRef} onClick = {progressBarSkip} className = {classes.player__progress}>
                    <div ref = {progressBarRef} className = {classes.player__subProgress}></div>
                </div>  
                <div className = {classes.player__container}>
                    <div onClick = {togglePlay} className = {classes.player__play}>
                        {
                            isPlaying ? 
                                <PauseIcon  classModule = {classes.player__icon}/>
                            :
                                <PlayIcon classModule = {classes.player__icon}/>
                        }
                    </div>
                    <div className = {classes.player__time}>
                        <span>{`${duration[0]}/${duration[1]}`}</span>
                    </div>
                </div>
            </div>
        </CSSTransition>    
        <video loop = {false} ref = {videoRef} width = {'100%'} height = {"100%"}>
            <source src = {src} />
            Браузер не поддерживает плеер
        </video>
    </div>
}



export default Player;