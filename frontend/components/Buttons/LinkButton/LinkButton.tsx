import React from "react";
import classes from "./LinkButton.module.scss"

interface IProps {
    onClick?: (...args:any) => any,
    classModule?:string,
    label:string
}

const LinkButton:React.FC<IProps> = ({onClick,label,classModule}) => {
    return <>
        <button className = {`${classes.button} ${classModule}`} onClick = {onClick}>{label}</button>
    </>
}


export default LinkButton;