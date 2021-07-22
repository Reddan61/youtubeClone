import React, { useState } from "react"
import classes from "./CheckBox.module.scss"

interface IProps {
    label:string,
    classModule?:string,
    isChecked?:boolean
}

const CheckBox:React.FC<IProps> = ({label,classModule,isChecked = false}) => {
    const [isCheck,setCheck] = useState(isChecked)

    return <div className = {`${classes.checkbox} ${classModule}`}>
        <input checked = {isCheck} onChange = {() => {
            setCheck(!isCheck)
        }} type = "checkbox" id = "checkbox"/>
        
        <label htmlFor = "checkbox">
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