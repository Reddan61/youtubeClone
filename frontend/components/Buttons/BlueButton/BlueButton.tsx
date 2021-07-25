import React from "react";
import classes from "./BlueButton.module.scss"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label:string
}

const BlueButton:React.FC<IProps> = ({onClick,label,children,type = "button", ...props}) => {
    return <>
        <button type = {type} {...props} className = {classes.button} onClick = {onClick}>{label} {children}</button>
    </>
}

export default BlueButton;