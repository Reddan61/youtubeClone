import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import videoReducer from "../../store/videoReducer";
import CheckBox from "../Formik/CheckBox";
import SaveIcon from "../svg/SaveIcon";
import CrossIcon from "../svg/СrossIcon";
import classes from "./Save.module.scss"

interface IProps {
    videoId:string,
    isSaved?:boolean
}

const Save:React.FC<IProps> = ({videoId,isSaved = false}) => {
    const [isOpen,setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const formRef = useRef(null)

    useEffect(() => {
        ref.current = document.createElement("div")
        const parentElem = document.querySelector('#__next')

        parentElem.appendChild(ref.current)
        return () => {      
            parentElem.removeChild(ref.current)
        }
    },[])
    useEffect(() => {
        if(isOpen) {
            document.documentElement.style.overflow = "hidden"
        }
        return () => {
            document.documentElement.style.overflow = "auto"
        }
    },[isOpen])

    const submit = async (value) => {
        if(value.later !== isSaved) {
            const laterResponse = await videoReducer.later(videoId) 
        }
        formRef.current.setSubmitting(false)
    }

    return <div className = {classes.save}>
        <div onClick = {() => {
            setOpen(true)
        }} className = {classes.save__container}>
            <SaveIcon classModule = {classes.icon__save}/>
            <span className = {classes.save__text}>Сохранить</span>
        </div>
        {isOpen && ReactDOM.createPortal(<div onClick = {() => {
            setOpen(false)
        }} className = {classes.popup}>
            <div onClick = {(e) => e.stopPropagation() } className = {classes.popup__container}>
                <div className = {classes.popup__title}>
                    <span>
                        Сохранить в...
                    </span>
                    <CrossIcon onClick = {() => {
                        setOpen(false)
                    }} classModule = {classes.icon__cross}/>
                </div>
                <div className = {classes.popup__body}>
                    <Formik
                        initialValues = {{
                            later:isSaved
                        }}
                        onSubmit = {submit}
                        innerRef = {formRef}
                    >
                        {({isSubmitting,values}) => (
                            <Form onChange = {() => {
                                formRef.current.handleSubmit()
                            }}>
                                <ul>
                                    <li>
                                        <Field component = {CheckBox} 
                                            disabled = {isSubmitting}
                                            name = {'later'}
                                            label = {"Смотреть позже"} 

                                        />
                                    </li>
                                </ul>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>,ref.current)}

    </div>
}


export default Save