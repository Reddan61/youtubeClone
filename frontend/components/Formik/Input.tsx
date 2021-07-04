import React from "react"
import ErrorSignIcon from "../svg/ErrorSignIcon"
import classes from "./Input.module.scss"

const Input = () => {
    let isError = true;
    return <div className = {`${classes.input} ${isError && classes.input_error}`}>
        <div className = {classes.input__container}>
            <input />
            <label>Телефон или адрес эл.почты</label>
        </div>
        <div className = {classes.error}>
            <ErrorSignIcon classModule = {classes.error__sign}/>
            <span>Введите адрес электронной почты или номер телефона</span>
        </div>
    </div>
}


export default Input