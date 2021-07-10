import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import classes from "./videoPreview.module.scss"
import {convertDate} from "../../assets/functions/convertDate"
import {convertTitle} from "../../assets/functions/convertVideoTitlePreview"
import {CSSTransition} from "react-transition-group"
import ClockIcon from '../svg/ClockIcon'

interface IProps {
    little?:boolean,
    list?:boolean,
}

const VideoPreview:React.FC<IProps> = ({little = false,list = false}) => {
    const hoverRef = useRef<HTMLDivElement>(null);
    const [currentImg,setCurrentImg] = useState(null)
    const [titleSymbol,setTitleSymbol] = useState(undefined);
    const arrImgSrc = ["/testReviewVideo/img1.jpg","/testReviewVideo/img2.jpg","/testReviewVideo/img3.jpg","/testReviewVideo/img4.jpg"]
    const titleText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has Lorem Ipsum has Lorem Ipsum has Lorem Ipsum has Lorem Ipsum has";
    // const titleText = "фффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффф";
    const nickaname = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

    useEffect(() => {
        symbolNumberTitle();
        window.addEventListener('resize',symbolNumberTitle)
        return () => {
            window.removeEventListener('resize',symbolNumberTitle)
        }
    },[])
    //hover эффект
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
    return <div className = {`${classes.videoPreview} ${little && classes.videoPreview_little} ${list && classes.videoPreview_list}`}>
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
                        <span className = {classes.videoPreview__viewersCount}>1,2 тыс просмотров</span>
                        <div className = {classes.videoPreview__dot}></div>
                        <span className = {classes.videoPreview__date}>{convertDate()}</span>
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
                        <span className = {classes.videoPreview__viewersCount}>1,2 тыс просмотров</span>
                        <div className = {classes.videoPreview__dot}></div>
                        <span className = {classes.videoPreview__date}>{convertDate()}</span>
                    </div>}
                </div>
            </div>
        </div>
    </div>
}


export default VideoPreview;