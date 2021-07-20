import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react"
import classes from "./TextArea.module.scss"

interface IProps {
    label:string,
    placeholder :string,
    maxCount:number,
    count:number,
    className?: string
}

const TextArea:React.FC<IProps> = ({label,placeholder,maxCount,count,className}) => {
    const ref = useRef<HTMLTextAreaElement>(null)
    const [isFocus,setFocus] = useState(false)
    const [initialheightTextArea,setInitialHeightTextArea] = useState(null)
    const isError = false
    const focusHandler = () => {
        
        setFocus(state => {
            return !state
        })
    }
    const textAreaChange = (e:any) => {
        // const target = e.target as HTMLTextAreaElement
        const textArea = ref.current
        console.log(textArea.scrollTop);
        
        if(textArea.scrollTop > 0){
            textArea.style.height = textArea.scrollHeight + "px";
        } else {
            textArea.style.height = initialheightTextArea + "px"
        }
    }

    useEffect(() => {
        setInitialHeightTextArea(ref.current.offsetHeight)
        ref.current.addEventListener("focus",focusHandler)
        ref.current.addEventListener("blur",focusHandler)

    },[])
    return <div className = {classes.textarea}>
        <div className = {`
            ${classes.textarea__container} 
            ${className} 
            ${isFocus && classes.textarea__container_active}
            ${isError && classes.textarea__container_error}
        `}>
            <div className = {`
                ${classes.textarea__header} 
                ${isFocus && classes.textarea__header_active}
                ${isError && classes.textarea__header_error}
            `}>
                <span>
                    {label}
                </span>
            </div>
            <textarea onChange = {textAreaChange} ref = {ref} placeholder = {placeholder}></textarea>
            <div className = {`
                ${classes.textarea__bottom} 
                ${isFocus && classes.textarea__bottom_active}
                ${isError && classes.textarea__bottom_error}
            `}>
                <span>{`${count}/${maxCount}`}</span>
            </div>
        </div>
    </div>
}


export default TextArea