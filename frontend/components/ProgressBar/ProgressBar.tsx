import React from "react";
import classes from "./ProgressBar.module.scss"

interface IProps {
    classModule?:string
}


const ProgressBar:React.FC<IProps> = ({classModule}) => {
    return <div className = {`${classes.progress} ${classModule}`}>
        <div className = {classes.progress__slide}>
        </div>
    </div>
}

export default ProgressBar;