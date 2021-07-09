import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import classes from "./videoPreview.module.scss"
import {convertDate} from "../../assets/functions/convertDate"
import {convertTitle} from "../../assets/functions/convertVideoTitlePreview"
import {CSSTransition} from "react-transition-group"
import ClockIcon from '../svg/ClockIcon'

interface IProps {
    little?:boolean
}

const VideoPreview:React.FC<IProps> = ({little = false}) => {
    const hoverRef = useRef<HTMLDivElement>(null);
    const [currentImg,setCurrentImg] = useState(null)
    const arrImgSrc = ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"]
    const titleText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has";
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
    return <div className = {`${classes.videoPreview} ${little && classes.videoPreview_little}`}>
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
                        <Image src = {"/imgTest.jpg"} className = {classes.videoPreview__preview} layout = {"fill"}  />
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
                            <Image className = {classes.image__img} src = {el} layout = {"fill"}  />
                        </div>
                    </CSSTransition>
                })}
                <div className = {classes.videoPreview__time}>11:33</div>
                <div className = {classes.videoPreview__later}>
                    <ClockIcon classModule = {classes.icon__clock}/>
                </div>
            </div>
            <div className = {classes.videoPreview__info}>
                {!little && 
                <div >
                    <Image layout = {'fixed'} className = {classes.videoPreview__avatar} src = {"/imgTest.jpg"} width = {35} height = {35}/>
                </div>
                }
                
                <div className = {classes.videoPreview__bottomInfo}>
                    <div className = {classes.videoPreview__title}>
                        <span className = {`showTitle`}>{convertTitle(titleText,little ? 21:undefined)}</span>
                    </div>
                    <div className = {classes.videoPreview__username}>
                        <span className = {`showTitle`}>nicknamenicknamenicknamenicknamenicknameaaaa</span>
                    </div>
                    <div className = {classes.videoPreview__viewers}>
                        <span className = {classes.videoPreview__viewersCount}>1,2 тыс просмотров</span>
                        <div className = {classes.videoPreview__dot}></div>
                        <span className = {classes.videoPreview__date}>{convertDate()}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default VideoPreview;