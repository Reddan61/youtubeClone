import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import classes from "./videoPreview.module.scss"
import {convertDate} from "../../assets/functions/convertDate"
import {convertTitle} from "../../assets/functions/convertVideoTitlePreview"
import {CSSTransition} from "react-transition-group"

const VideoPreview = () => {
    const hoverRef = useRef<HTMLDivElement>(null);
    const [currentImg,setCurrentImg] = useState(null)
    const arrImgSrc = ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"]
    
    useEffect(() => {
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
            if(imgTimeout !== null) {
                return
            }
            hoverHandler();
        }
        hoverRef.current.onmouseleave = () => {
            currentIndex = 0;
            setCurrentImg(null)
            clearTimeout(imgTimeout) 
            imgTimeout = null;
        }
    },[])
    return <div className = {classes.videoPreview}>
        <div className = {classes.videoPreview__container}>
            <div className = {classes.videoPreview__videoImage} ref = {hoverRef}>
                <CSSTransition in = {currentImg === null} timeout = {500} unmountOnExit
                        classNames = {{
                            enter: classes.animation__enter,
                            enterActive: classes.animation__enter_active,
                            exit: classes.animation__exit,
                            exitActive: classes.animation__exit_active
                        }}
                    > 
                    <>
                        <Image src = {"/dog.jpg"} className = {classes.videoPreview__preview} layout = {"fixed"} width = {350} height = {200}/>
                    </>
                </CSSTransition>
                {arrImgSrc.map((el,index) => {
                    return <CSSTransition  key = {index} in = {arrImgSrc[index] === currentImg} timeout = {500} unmountOnExit
                        classNames = {{
                            enter: classes.animation__enter,
                            enterActive: classes.animation__enter_active,
                            exit: classes.animation__exit,
                            exitActive: classes.animation__exit_active
                        }}
                    > 
                        <div className = {classes.image}>
                            {/* <CSSTransition in = {true} appear = {true} timeout = {1000} unmountOnExit
                                classNames = {{
                                    appear: classes.animation__appear,
                                    appearActive: classes.animation__appear_active
                                }}
                            > 
                                <div className = {classes.image__mask}></div>
                            </CSSTransition> */}
                            <img className = {classes.image__img} src = {el} width = {350} height = {200}/>
                        </div>
                    </CSSTransition>
                })}
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