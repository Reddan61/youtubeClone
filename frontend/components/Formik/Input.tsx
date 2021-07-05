import React from "react"
import ErrorSignIcon from "../svg/ErrorSignIcon"
import classes from "./Input.module.scss"

interface IProps {
    width?:string,
    height?:string,
    placeholder:string,
    classModule:string
}

const Input:React.FC<IProps> = ({width,placeholder,height,classModule}) => {
    let isError = false;
    return <div className = {`${classes.input} ${isError && classes.input_error}`}>
        <div className = {classes.input__container}>
            <input className = {classModule} style = {{
                width,
                height
            }} />
            <label>{placeholder}</label>
        </div>
        {isError && <div className = {classes.error}>
            <ErrorSignIcon classModule = {classes.error__sign}/>
            <span>Введите адрес электронной почты или номер телефона</span>
        </div>}
    </div>
}


export default Input