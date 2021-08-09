import { FieldProps } from "formik";
import React, { useEffect, useState } from "react"
import ErrorSignIcon from "../svg/ErrorSignIcon"
import classes from "./Input.module.scss"

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    width?:string,
    height?:string,
    placeholder:string,
    classModule:string,
    isError: boolean,
    helpText:string
}

const Input:React.FC<FieldProps<any> & IProps> = ({isError,helpText,width,placeholder,height,classModule,field,form,...props}) => {
    return <div className = {`${classes.input} ${isError && classes.input_error} ${classModule}`}>
        <div className = {classes.input__container}>
            <input {...props} {...field}/>
            <label>{placeholder}</label>
        </div>
        {isError && <div className = {classes.error}>
            <ErrorSignIcon classModule = {classes.error__sign}/>
            <span>{helpText}</span>
        </div>}
    </div>
}


export default Input