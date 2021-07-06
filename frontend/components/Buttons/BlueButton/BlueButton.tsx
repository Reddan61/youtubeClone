import React from "react";
import classes from "./BlueButton.module.scss"

interface IProps {
    onClick?: (...args:any) => any,
    label:string
}

const BlueButton:React.FC<IProps> = ({onClick,label}) => {
    return <>
        <button className = {classes.button} onClick = {onClick}>{label}</button>
    </>
}

export default BlueButton;