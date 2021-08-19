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

interface IProps extends IVideo{
    little?:boolean,
    list?:boolean,
    hideUsername?:boolean
}

const VideoPreview:React.FC<IProps> = ({
        little = false,list = false,hideUsername = false,
        author,date,_id,name,duration,previewImage,views,screenshots
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
        Router.push(`/video/${_id}`)
    }
    //preload images
    // const preloadImages =() => {
    //     let promises = [];
    //     screenshots.forEach(picture => {
    //         promises.push(new Promise<void>((resolve,reject) => {
    //             const img = new window.Image()
    //             img.onload = () => {
    //                 resolve()
    //             }
    //             img.src = convertAvatarSrc(picture)
    //         }))
    //     })
    //     Promise.all(promises).then(() => {       
    //         setImagesReady(true)
    //     })
    // }

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
            setCurrentImg(screenshots[currentIndex])
                if(currentIndex + 1 > (screenshots.length - 1)) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
            }
            imgTimeout = setTimeout(() => {
                hoverHandler();
            },5000)
        }
        hoverRef.current.onmouseenter = () => {
            //preloadImages()
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
                        <Image loader = {() => convertAvatarSrc(previewImage)} src = {convertAvatarSrc(previewImage)} className = {classes.videoPreview__preview} layout = {"fill"}  />
                    </>
                </CSSTransition>

                {/* Слайдер */}
                {screenshots.map((el,index) => {
                    return <div key = {index} style = {{
                        visibility: screenshots[index] === currentImg ? "visible" : "hidden"
                    }} className = {classes.image}>
                        <img className = {classes.image__img} 
                        //  loader = {() => convertAvatarSrc(el)} 
                         src = {convertAvatarSrc(el)}  
                         />
                    </div>
                })}
                
                <div className = {classes.videoPreview__time}>{convertVideoDuration(duration)}</div>
                <div className = {classes.videoPreview__later}>
                    <ClockIcon classModule = {classes.icon__clock}/>
                </div>
            </div>
            <div className = {classes.videoPreview__info}>
                {!little && !list &&
                    <div onClick = {(e) => {
                        e.stopPropagation()
                        Router.push(`/profile/${author._id}`)}} className = {classes.videoPreview__avatar_div}>
                        <Image loader = {() => convertAvatarSrc(previewImage)} src = {convertAvatarSrc(author.avatar)} layout = {'fixed'} className = {classes.videoPreview__avatar} width = {35} height = {35}/>
                    </div>
                }
                
                <div className = {classes.videoPreview__bottomInfo}>
                    <div className = {classes.videoPreview__title}>
                        <span className = {`showTitle`}>{convertTitle(name,titleSymbol)}</span>
                    </div>

                    {list && 
                        <div className = {classes.videoPreview__viewers}>
                            <span className = {classes.videoPreview__viewersCount}>{convertCount(views)}</span>
                            <div className = {classes.videoPreview__dot}></div>
                            <span className = {classes.videoPreview__date}>{convertDate(date)}</span>
                        </div>
                    }

                   { !hideUsername && 
                    <div className = {classes.videoPreview__username}>
                        {list && 
                            <div onClick = {(e) => {
                                e.stopPropagation()
                                Router.push(`/profile/${author._id}`)}} className = {classes.videoPreview__avatar_div}>
                                <Image loader = {() => convertAvatarSrc(previewImage)} src = {convertAvatarSrc(author.avatar)} layout = {'fixed'} className = {classes.videoPreview__avatar} width = {24} height = {24}/>
                            </div>
                        }
                            <span className = {`showTitle`}>{author}</span>
                        </div>
                    }
                    {!list && 
                        <div className = {classes.videoPreview__viewers}>
                            <span className = {classes.videoPreview__viewersCount}>{convertCount(views)}</span>
                            <div className = {classes.videoPreview__dot}></div>
                            <span className = {classes.videoPreview__date}>{convertDate(date)}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}


export default VideoPreview;