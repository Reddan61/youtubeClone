import { Field, Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Badge from "../Badge/Badge";
import BlueButton from "../Buttons/BlueButton/BlueButton";
import TextArea from "../Formik/TextArea";
import Player from "../Player/Player";
import UploadCircleIcon from "../svg/UploadCircleIcon";
import CrossIcon from "../svg/СrossIcon";
import classes from "./UploadVideo.module.scss"
import * as Yup from 'yup';
import axios from "axios";
import { instance } from "../../store/API/API";
import videoReducer from "../../store/videoReducer";

interface IProps {
    setPopUp: (bool:boolean) => void
}



const UploadVideo:React.FC<IProps> = ({setPopUp}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isBrowser,setBrowser] = useState(false)
    const [title,setTitle] = useState('')
    const [imageBadge,setImageBadge] = useState<File | null>(null)
    const [videoId,setVideoId] = useState<null | string>(null)
    const [isUploadedVideo,setIsUploadedVideo] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef(null)



    const progressRef = useRef(0)

    useEffect(() => {
        ref.current = document.createElement("div");
        const parentElem = document.querySelector('#__next');
        parentElem.appendChild(ref.current)
        document.documentElement.style.overflow = "hidden"
        setBrowser(true)
        return () => {      
            document.documentElement.style.overflow = "auto"
            parentElem.removeChild(ref.current)
        }
    },[])

    const changeTitle = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value)
    }

    const videoUploadHandler = async (e:any) => {
        e.preventDefault()
        
        const extensions = ["video/mp4"]
        const file = e.target.files ? e.target.files :  e.dataTransfer.files
        
        if(!extensions.includes(file[0].type)) {
            alert("Неправильный формат!")
            return
        }

        const formdata = new FormData()
        formdata.set("video",file[0])
        instance.post("videos/upload",formdata, {
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if (totalLength !== null) {
                    progressRef.current = (Math.round( (progressEvent.loaded * 100) / totalLength ))
                }
            }
        }).then(response => {
            const data = response.data
            if(response.data.message === "success") {
                setVideoId(data.payload.id)
            }
        })
        setIsUploadedVideo(true)
    }


    const submit = async (values, {setSubmitting}) => {
        if(!imageBadge) {
            alert("Выберите значок")
            return
        }
        const formData = new FormData()

        formData.set("name",values.name)
        formData.set("description",values.description)
        formData.set("videoId",videoId)
        formData.set("preview",imageBadge)

        const response = await videoReducer.publicateVideo(formData)

        if(response.message === "success") {
            setPopUp(false)
        } else {
            alert("Что-то пошло не так!")
        }
        
        setSubmitting(false)
    }
    return <>
        {isBrowser && ReactDOM.createPortal(<div className = {classes.upload}>
            <div className = {classes.upload__container}>
                <div className = {classes.upload__header}>
                    <span>
                        {
                            isUploadedVideo ? 
                                title 
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
                            <div>
                                <Formik
                                    initialValues = {{
                                        name:"",
                                        description:""
                                    }}
                                    onSubmit = {submit}
                                    validationSchema = {uploadSchema}
                                    innerRef = {formRef}
                                >
                                    {({values,touched,errors}) => (
                                        <Form>
                                            <Field component = {TextArea} 
                                                name = {"name"}
                                                label = {"Название"} 
                                                placeholder = {"Добавьте название, которое оторажает содержание вашего ролика"}
                                                maxCount = {100}
                                                count = {values.name.length}  
                                                className = {classes.upload__name}  
                                                isError = {Boolean(errors.name) && touched.name}
                                                handleChange = {changeTitle}
                                            />
                                            <Field component = {TextArea}
                                                name = {"description"}
                                                label = {"Описание"} 
                                                placeholder = {"Расскажите, о чем ваше видео"}
                                                maxCount = {5000}
                                                count = {values.description.length}  
                                                className = {classes.upload__description} 
                                                isError = {Boolean(errors.description) && touched.description}
                                            />
                                        </Form>
                                    )}    
                                </Formik>
                            </div>
                            <div className = {classes.upload__badge}>
                                <span>
                                    Значок
                                </span>
                                <Badge takeImageFile = {setImageBadge}/>
                            </div>
                        </div>
                        <div className = {classes.upload__right}>
                            <div className = {classes.upload__player}>
                                <Player id = {videoId}/>
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
                        <span>{`Загружен ${progressRef.current}%`}</span>
                        <div className = {classes.upload__button_next}>
                            <BlueButton 
                                disabled = {formRef.current?.isSubmitting}
                                onClick = {() => formRef.current.handleSubmit()} label = {"Далее"}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>,ref.current)}
    </>
}

const uploadSchema = Yup.object().shape({
    name: Yup.string()
        .min(5,"Слишком мало символов")
        .max(100, "Слишком много символов")
        .required("Обязательное поле"),
    description: Yup.string()
        .max(5000, "Слишком много символов")
        .required("Обязательное поле"),
})

export default UploadVideo