import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import classes from "./videoPreview.module.scss"
import {convertDate} from "../../assets/functions/convertDate"
import {convertTitle} from "../../assets/functions/convertVideoTitlePreview"
import {CSSTransition} from "react-transition-group"
import ClockIcon from '../svg/ClockIcon'
import Router from 'next/router'
import { converCount } from '../../assets/functions/converCount'

interface IProps {
    little?:boolean,
    list?:boolean,
}

const VideoPreview:React.FC<IProps> = ({little = false,list = false}) => {
    const hoverRef = useRef<HTMLDivElement>(null);
    const [currentImg,setCurrentImg] = useState(null)
    const [titleSymbol,setTitleSymbol] = useState(undefined);
    const [isImagesReady,setImagesReady] = useState(false)
    const arrImgSrc = ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"]
    const titleText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has Lorem Ipsum has Lorem Ipsum has Lorem Ipsum has Lorem Ipsum has";
    // const titleText = "фффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффф";
    const nickaname = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    const viewersCount = 111520
    const date = new Date("2021-06-01")
    const time = "11:33"
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
        Router.push(`/video/${1}`)
    }
    //preload images
    useEffect(() => {
        let promises = [];
        arrImgSrc.forEach(picture => {
            promises.push(new Promise<void>((resolve,reject) => {
                const img = new window.Image()
                img.onload = () => {
                    resolve()
                }
                img.src = picture
            }))
        })
        Promise.all(promises).then(() => {       
            setImagesReady(true)
        })
    },[])

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
            setCurrentImg(arrImgSrc[currentIndex])
                if(currentIndex + 1 > (arrImgSrc.length - 1)) {
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
                if(isImagesReady) {
                    hoverHandler();
                }
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
                        <Image src = {"/imgTest.jpg"} className = {classes.videoPreview__preview} layout = {"fill"}  />
                    </>
                </CSSTransition>
                {arrImgSrc.map((el,index) => {
                    return <div key = {index} style = {{
                        visibility: arrImgSrc[index] === currentImg ? "visible" : "hidden"
                    }} className = {classes.image}>
                        <img className = {classes.image__img} src = {el} width = {"100%"}  />
                    </div>
                })}
                <div className = {classes.videoPreview__time}>{time}</div>
                <div className = {classes.videoPreview__later}>
                    <ClockIcon classModule = {classes.icon__clock}/>
                </div>
            </div>
            <div className = {classes.videoPreview__info}>
                {!little && !list &&
                <div className = {classes.videoPreview__avatar_div}>
                    <Image layout = {'fixed'} className = {classes.videoPreview__avatar} src = {"/imgTest.jpg"} width = {35} height = {35}/>
                </div>
                }
                
                <div className = {classes.videoPreview__bottomInfo}>
                    <div className = {classes.videoPreview__title}>
                        <span className = {`showTitle`}>{convertTitle(titleText,titleSymbol)}</span>
                    </div>
                    {list && <div className = {classes.videoPreview__viewers}>
                        <span className = {classes.videoPreview__viewersCount}>{converCount(viewersCount)}</span>
                        <div className = {classes.videoPreview__dot}></div>
                        <span className = {classes.videoPreview__date}>{convertDate(date)}</span>
                    </div>}
                    <div className = {classes.videoPreview__username}>
                    {list && 
                        <div className = {classes.videoPreview__avatar_div}>
                            <Image layout = {'fixed'} className = {classes.videoPreview__avatar} src = {"/imgTest.jpg"} width = {24} height = {24}/>
                        </div>
                    }
                        <span className = {`showTitle`}>{nickaname}</span>
                    </div>
                    {!list && <div className = {classes.videoPreview__viewers}>
                        <span className = {classes.videoPreview__viewersCount}>{converCount(viewersCount)}</span>
                        <div className = {classes.videoPreview__dot}></div>
                        <span className = {classes.videoPreview__date}>{convertDate(date)}</span>
                    </div>}
                </div>
            </div>
        </div>
    </div>
}


export default VideoPreview;