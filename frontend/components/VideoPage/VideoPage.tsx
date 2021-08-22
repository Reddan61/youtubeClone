import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import classes from "./VideoPage.module.scss"
import Player from "../Player/Player";
import Rating from "../Rating/Rating";
import Save from "../Save/Save";
import VideoInfo from "./VideoInfo";
import Comment from "../Comment/Comment";
import { useScroll } from "../Hook/useScroll";
import LoaderIcon from "../svg/LoaderIcon";
import authReducer from "../../store/authReducer";
import { observer } from "mobx-react-lite";
import { convertAvatarSrc } from "../../assets/functions/convertAvatarSrc";
import videoReducer, { IComment } from "../../store/videoReducer";
import { IVideo } from "../../store/videoListReducer";

interface IProps {
    video: IVideo,
    isSub:boolean,
    comments:IComment[],
    totalPages:number,
    userRating: 0 | 1 | 2
}


const VideoPage:React.FC<IProps> = (props) => {

    const [textAreaText,setTextAreaText] = useState("")
    const [showButtons,setShowButtons] = useState(false)
    const [isBrowser,setIsBrowser] = useState(false)
    const [isLoading] = useScroll(videoReducer.addComments.bind(videoReducer))
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const video = isBrowser ? videoReducer.video : props.video
    const comments = isBrowser ? videoReducer.comments : props.comments
    const isSub = isBrowser ? videoReducer.isSub : props.isSub
    const userRating = isBrowser ? videoReducer.userRating : props.userRating

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

    const textAreaChange = (e:SyntheticEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement
        const textArea = textareaRef.current
        
        if(textArea.scrollTop > 0){
            textArea.style.height = textArea.scrollHeight + "px";
        } else {
            textArea.style.height = 22 + "px"
        }

        setTextAreaText(target.value)
    }

    const sendComment = async () => {
        const response = await videoReducer.addComment(textAreaText)
    }

    useEffect(() => {
        videoReducer.setInitialState(
                video,props.userRating, props.isSub,
                comments,props.totalPages
            )
        setIsBrowser(true)
    },[])    

    return <div className = {classes.videoPage}>
        <div className = {classes.videoPage__container}>
            <div className = {classes.videoPage__left}>
                <Player id = {video._id}/>
                <div className = {classes.videoPage__info}>
                    <div className = {classes.videoPage__title}>
                        <h1>{video.name}</h1>
                    </div>
                    <div className = {classes.videoPage__subInfo}>
                        <div className = {classes.subInfo}>
                            {convertViewers(video.views)}
                            <div className = {classes.subInfo__dot}>
                                <div></div>
                            </div>
                            <span>{convertDate(new Date(video.date))}</span>
                        </div>
                        <div className = {classes.videoPage__add}>
                            <Rating videoId = {video._id} rating = {userRating} likes = {video.rating.likes} dislikes = {video.rating.dislikes} />
                            <Save videoId = {video._id} isSaved = {video.isSavedLater}/>
                        </div>
                    </div>
                    <VideoInfo author = {video.author} description = {video.description} isSub = {isSub}/>
                </div>
                {authReducer.isAuth && 
                    <div className = {classes.send}>
                        <div className = {classes.send__image}>
                            <img src={convertAvatarSrc(authReducer.user.avatar)} alt="img" width = {"100%"} height = {"100%"}/>
                        </div>
                        <div className = {classes.send__body}>
                            <div className = {classes.send__textarea}>
                                <textarea onFocus = {() => {
                                    setShowButtons(true)
                                }} ref = {textareaRef} onChange = {textAreaChange} placeholder = {"Оставьте сообщение"} value = {textAreaText} />
                            </div>
                            {showButtons && 
                                <div className = {classes.send__buttons}>
                                    <button onClick = {() => {
                                        setTextAreaText("")
                                        setShowButtons(false)
                                    }}className = {classes.send__cancel}>Отмена</button>
                                    <button onClick = {sendComment} disabled = {textAreaText.length === 0} className = {classes.send__submit}>Оставить комментарий</button>
                                </div>
                            }               
                        </div>
                    </div>
                }
                <div className = {classes.videoPage__comments}>
                    {
                        comments.map(el => {
                            return <Comment key = {el.text + el.user._id + el.date} comment = {el}/>
                        })
                    }
                </div>
            </div>
        </div>
        <div className = {classes.videoPage__bottom}>
            {isLoading && 
                <LoaderIcon classModule = {classes.videoPage__loader}/>
            }
        </div>
    </div>
}



export default observer(VideoPage);