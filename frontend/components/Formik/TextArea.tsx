import { FieldProps } from "formik"
import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useRef, useState } from "react"
import classes from "./TextArea.module.scss"

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label:string,
    placeholder :string,
    maxCount:number,
    count:number,
    className?: string,
    isError:boolean,
    handleChange?: (e:ChangeEvent<HTMLTextAreaElement>) => any
}

const TextArea:React.FC<FieldProps<any> & IProps> = ({handleChange,isError,label,placeholder,maxCount,count,className,field,...props}) => {
    const ref = useRef<HTMLTextAreaElement>(null)
    const [isFocus,setFocus] = useState(false)
    const initialheightTextAreaRef = useRef(null)

    const focusHandler = () => {
        setFocus(state => {
            return !state
        })
    }

    const textAreaChange = (e:any) => {
        const textArea = ref.current
        setTimeout(() => {
            if(textArea.scrollTop > 0){
                textArea.style.height = textArea.scrollHeight + "px";
            } else {
                textArea.style.height = initialheightTextAreaRef.current + "px"
            }
            if(handleChange) {
                handleChange(e)
            }
        },10)
    }

    useEffect(() => {
        initialheightTextAreaRef.current = ref.current.offsetHeight
        ref.current.addEventListener("input",textAreaChange)
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
            <textarea {...field} {...props} ref = {ref} placeholder = {placeholder}></textarea>
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