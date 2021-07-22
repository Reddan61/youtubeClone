import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CheckBox from "../Formik/CheckBox";
import SaveIcon from "../svg/SaveIcon";
import CrossIcon from "../svg/СrossIcon";
import classes from "./Save.module.scss"

interface IProps {
    id:string,
    isSaved?:boolean
}

const Save:React.FC<IProps> = ({id,isSaved = false}) => {
    const [isOpen,setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        ref.current = document.createElement("div");
        const parentElem = document.querySelector('#__next');
        parentElem.appendChild(ref.current)
        return () => {      
            parentElem.removeChild(ref.current)
        }
    },[])
    return <div className = {classes.save}>
        <div onClick = {() => {
            setOpen(true)
        }} className = {classes.save__container}>
            <SaveIcon classModule = {classes.icon__save}/>
            <span className = {classes.save__text}>Сохранить</span>
        </div>
        {isOpen && ReactDOM.createPortal(<div onClick = {() => {
            setOpen(false)
        }} className = {classes.popup}>
            <div onClick = {(e) => e.stopPropagation() } className = {classes.popup__container}>
                <div className = {classes.popup__title}>
                    <span>
                        Сохранить в...
                    </span>
                    <CrossIcon onClick = {() => {
                        setOpen(false)
                    }} classModule = {classes.icon__cross}/>
                </div>
                <div className = {classes.popup__body}>
                    <ul>
                        <li>
                            <CheckBox isChecked = {isSaved} label = {"Смотреть позже"}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>,ref.current)}

    </div>
}


export default Save