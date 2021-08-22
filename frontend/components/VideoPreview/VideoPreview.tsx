import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import classes from "./videoPreview.module.scss"
import {convertDate} from "../../assets/functions/convertDate"
import {convertTitle} from "../../assets/functions/convertVideoTitlePreview"
import {CSSTransition} from "react-transition-group"
import ClockIcon from '../svg/ClockIcon'
import Router from 'next/router'
import { convertCount } from '../../assets/functions/convertCount'
import { IVideo } from '../../store/videoListReducer'
import { convertAvatarSrc } from '../../assets/functions/convertAvatarSrc'
import { convertVideoDuration } from '../../assets/functions/convertVideoDuration'
import videoReducer from '../../store/videoReducer'
import authReducer from '../../store/authReducer'

interface IProps{
    little?:boolean,
    list?:boolean,
    hideUsername?:boolean,
    video:IVideo
}

const VideoPreview:React.FC<IProps> = ({
        little = false,list = false,hideUsername = false,
        video
    }) => {
    const hoverRef = useRef<HTMLDivElement>(null)
    const [currentImg,setCurrentImg] = useState(null)
    const [titleSymbol,setTitleSymbol] = useState(undefined)
    const [isImagesReady,setImagesReady] = useState(false)

    //Кол-во символов для title
    const symbolNumberTitle = useCallback(() => {
        const windowSize = window.innerWidth
        if(little && !list) {
            setTitleSymbol(21)
        } else if(!little && list) {
            if(windowSize <= 1400 && windowSize > 1250 ) {
                setTitleSymbol(70)
            } else if(windowSize <= 1250) {
                setTitleSymbol(40)
            } else {
                setTitleSymbol(90)
            }
        }
    },[])
    const clickOnVideo = () => {
        Router.push(`/video/${video._id}`)
    }

    const clickOnClock = async (e) => {
        e.stopPropagation()
        const response = await videoReducer.later(video._id)

        if(response.message !== "success") {
            alert("Что-то пошло не так!")
        }
    }

    //Изменение кол-ва символов в title
    useEffect(() => {
        symbolNumberTitle();
        window.addEventListener('resize',symbolNumberTitle)
        return () => {
            window.removeEventListener('resize',symbolNumberTitle)
        }
    },[])
    //hover эффект
    useEffect(() => {
        let hoverTimeout : ReturnType<typeof setTimeout> = null;
        let imgTimeout : ReturnType<typeof setTimeout> = null;
        let currentIndex = 0;
        const hoverHandler = () => {
            setCurrentImg(video.screenshots[currentIndex])
                if(currentIndex + 1 > (video.screenshots.length - 1)) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
            }
            imgTimeout = setTimeout(() => {
                hoverHandler();
            },5000)
        }
        hoverRef.current.onmouseenter = () => {
            hoverTimeout = setTimeout(() => {
                if(imgTimeout !== null) {
                    return
                }
                hoverHandler();
            },2000)
        }
        hoverRef.current.onmouseleave = () => {
            clearTimeout(hoverTimeout)
            currentIndex = 0;
            setCurrentImg(null)
            clearTimeout(imgTimeout) 
            imgTimeout = null;
        }
    },[isImagesReady])
    
    return <div onClick = {clickOnVideo} className = {`${classes.videoPreview} ${little && classes.videoPreview_little} ${list && classes.videoPreview_list}`}>
        <div className = {classes.videoPreview__container}>
            <div className = {classes.videoPreview__videoImage} ref = {hoverRef}>
                <CSSTransition in = {currentImg === null} timeout = {300} unmountOnExit
                        classNames = {{
                            enter: classes.animation__enter,
                            enterActive: classes.animation__enter_active,
                            exit: classes.animation__exit,
                            exitActive: classes.animation__exit_active
                        }}
                    > 
                    <>
                        <Image loader = {() => convertAvatarSrc(video.previewImage)} src = {convertAvatarSrc(video.previewImage)} className = {classes.videoPreview__preview} layout = {"fill"}  />
                    </>
                </CSSTransition>

                {/* Слайдер */}
                {video.screenshots.map((el,index) => {
                    return <div key = {index} style = {{
                        visibility: video.screenshots[index] === currentImg ? "visible" : "hidden"
                    }} className = {classes.image}>
                        <img className = {classes.image__img} 
                            src = {convertAvatarSrc(el)}  
                         />
                    </div>
                })}
                
                <div className = {classes.videoPreview__time}>{convertVideoDuration(video.duration)}</div>
                {authReducer.isAuth &&  
                    <div onClick = {clickOnClock} 
                        className = {classes.videoPreview__later}>
                        <ClockIcon classModule = {classes.icon__clock}/>
                    </div>
                }
            </div>
            <div className = {classes.videoPreview__info}>
                {!little && !list &&
                    <div onClick = {(e) => {
                        e.stopPropagation()
                        Router.push(`/profile/${video.author._id}`)}} className = {classes.videoPreview__avatar_div}>
                        <Image loader = {() => convertAvatarSrc(video.author.avatar)} src = {convertAvatarSrc(video.author.avatar)} layout = {'fixed'} className = {classes.videoPreview__avatar} width = {35} height = {35}/>
                    </div>
                }
                
                <div className = {classes.videoPreview__bottomInfo}>
                    <div className = {classes.videoPreview__title}>
                        <span className = {`showTitle`}>{convertTitle(video.name,titleSymbol)}</span>
                    </div>

                    {list && 
                        <div className = {classes.videoPreview__viewers}>
                            <span className = {classes.videoPreview__viewersCount}>{convertCount(video.views)}</span>
                            <div className = {classes.videoPreview__dot}></div>
                            <span className = {classes.videoPreview__date}>{convertDate(video.date)}</span>
                        </div>
                    }

                   { !hideUsername && 
                    <div className = {classes.videoPreview__username}>
                        {list && 
                            <div onClick = {(e) => {
                                e.stopPropagation()
                                Router.push(`/profile/${video.author._id}`)}} className = {classes.videoPreview__avatar_div}>
                                <Image loader = {() => convertAvatarSrc(video.author.avatar)} src = {convertAvatarSrc(video.author.avatar)} layout = {'fixed'} className = {classes.videoPreview__avatar} width = {24} height = {24}/>
                            </div>
                        }
                            <span className = {`showTitle`}>{`${video.author.name} ${video.author.secondName}`}</span>
                        </div>
                    }
                    {!list && 
                        <div className = {classes.videoPreview__viewers}>
                            <span className = {classes.videoPreview__viewersCount}>{convertCount(video.views)}</span>
                            <div className = {classes.videoPreview__dot}></div>
                            <span className = {classes.videoPreview__date}>{convertDate(video.date)}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}


export default VideoPreview;