import React, { ChangeEvent, DragEventHandler, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Badge from "../Badge/Badge";
import BlueButton from "../Buttons/BlueButton/BlueButton";
import TextArea from "../Formik/TextArea";
import Player from "../Player/Player";
import UploadCircleIcon from "../svg/UploadCircleIcon";
import CrossIcon from "../svg/СrossIcon";
import classes from "./UploadVideo.module.scss"

interface IProps {
    setPopUp: (bool:boolean) => void
}



const UploadVideo:React.FC<IProps> = ({setPopUp}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isBrowser,setBrowser] = useState(false)
    const [name,setName] = useState('Name')
    const [discription,setDiscription] = useState('')
    const [isUploadedVideo,setIsUploadedVideo] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current = document.createElement("div");
        const parentElem = document.querySelector('#__next');
        parentElem.appendChild(ref.current)
        setBrowser(true)
        return () => {      
            parentElem.removeChild(ref.current)
        }
    },[])

    const videoUploadHandler = (e:any) => {
        e.preventDefault()
        
        const extensions = ["video/mp4"]
        const file = e.target.files ? e.target.files :  e.dataTransfer.files

        // Отправить видеофайл на сервер
        // + лоадер сделать
        setIsUploadedVideo(true)
    }

    return <>
        {isBrowser && ReactDOM.createPortal(<div className = {classes.upload}>
            <div className = {classes.upload__container}>
                <div className = {classes.upload__header}>
                    <span>
                        {
                            isUploadedVideo ? 
                                name 
                            :
                                "Загрузка видео"
                        }
                    </span>
                    <CrossIcon onClick = {() => { setPopUp(false)}} classModule = {classes.icon__cross}/>
                </div>
                <div className = {`
                    ${classes.upload__body}
                    ${!isUploadedVideo && classes.upload__body_first}
                `}>
                    { isUploadedVideo ?
                    <>
                        <div className = {classes.upload__left}>
                            <div className = {classes.upload__title}>
                                Информация
                            </div>
                            <div >
                                <TextArea 
                                    label = {"Название"} 
                                    placeholder = {"Добавьте название, которое оторажает содержание вашего ролика"}
                                    maxCount = {100}
                                    count = {25}  
                                    className = {classes.upload__name}  
                                />
                            </div>
                            <div >
                                <TextArea 
                                    label = {"Описание"} 
                                    placeholder = {"Расскажите, о чем ваше видео"}
                                    maxCount = {5000}
                                    count = {25}  
                                    className = {classes.upload__description}
                                />
                            </div>
                            <div className = {classes.upload__badge}>
                                <span>
                                    Значок
                                </span>
                                <Badge />
                            </div>
                        </div>
                        <div className = {classes.upload__right}>
                            <div className = {classes.upload__player}>
                                <Player src = {"/testvideo.mp4"}/>
                            </div>
                        </div>
                    </>
                    :
                    <div className = {classes.videoUpload}
                        onDragEnter = {(e) => e.preventDefault()}
                        onDragOver = {(e) => e.preventDefault()}
                        onDrop = {videoUploadHandler}
                    >
                        <UploadCircleIcon classModule = {classes.icon__upload}/>
                        <span className = {classes.videoUpload__title}>Перетащите файл сюда или нажмите кнопку ниже, чтобы выбрать видео на компьютере.</span>
                        <span className = {classes.videoUpload__subtitle}>Пока вы не опубликуете видео, доступ к ним будет ограничен.</span>
                        <input 
                            ref = {inputRef} type = {"file"} style = {{display:"none"}}
                            onChange = {videoUploadHandler}
                        />
                        <div onClick = {() => {
                            inputRef.current.click()
                        }}
                            className = {classes.videoUpload__button}
                        >
                            <BlueButton label = {"Выбрать файл"} />
                        </div>
                    </div>
                    }
                </div>
                {isUploadedVideo &&
                    <div className = {classes.upload__bottom}>
                        <span>{"Загружено 47%"}</span>
                        <div className = {classes.upload__button_next}>
                            <BlueButton label = {"Далее"}/>
                        </div>
                    </div>
                }
            </div>
        </div>,ref.current)}
    </>
}



export default UploadVideo