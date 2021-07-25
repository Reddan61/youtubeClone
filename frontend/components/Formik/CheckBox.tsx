import { FieldProps } from "formik"
import React, { useState } from "react"
import classes from "./CheckBox.module.scss"

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string,
    classModule?:string,
    isChecked?:boolean
}

const CheckBox:React.FC<IProps & FieldProps<any>> = ({label,classModule,isChecked = false,field,...props}) => {
    
    return <div className = {`${classes.checkbox} ${classModule}`}>
        <input checked = {field.value} {...field} {...props} type = "checkbox" id = {`checkbox${label}`}/>
        
        <label htmlFor = {`checkbox${label}`}>
            <div className = {classes.checkbox__box}>
                <div className = {classes.checkbox__container}></div>
                <span></span>
                <div className = {classes.checkbox__forAnimation}></div>
            </div>
            <span>{label}</span>
        </label>
    </div>
}


export default CheckBox;