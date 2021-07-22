import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Burger from "../Burger/Burger";
import YoutubeIcon from "../svg/YoutubeIcon";
import classes from "./sideBarPortal.module.scss"
import {CSSTransition } from "react-transition-group"
import SideBarContent from "./SideBarContent";
import sideBarReducer from "../../store/sideBarReducer"
import { observer } from "mobx-react-lite";

interface IProps {

}

const SideBarPortal:React.FC<IProps> = ({}) => {
    const [isBrowser,setIsBrowser] = useState(false) 
    const [startAnimation,setStartAnimation] = useState(true)    

    const ref = useRef<HTMLDivElement>(null)

    const burgerHandler = () => {
        setStartAnimation(false)
        setTimeout(() => {
            sideBarReducer.changeOpenSideBarPortal()
        },300)
    }
    
    useEffect(() => {
        ref.current = document.createElement("div");
        const parentElem = document.querySelector('#__next');
        parentElem.appendChild(ref.current)
        setIsBrowser(true)
        return () => {      
            parentElem.removeChild(ref.current)
        }
    },[])

    if(isBrowser) {
        return ReactDOM.createPortal(
            <CSSTransition  in = {startAnimation} timeout = {300}
                unmountOnExit
                classNames = {{
                    enter:classes.animationRoot__enter,
                    enterActive:classes.animationRoot__enter_active,
                    exit:classes.animationRoot__exit,
                    exitActive:classes.animationRoot__exit_active
                }}
            >
            <div onClick = {burgerHandler} className = {classes.sideBar}>
            <CSSTransition in = {startAnimation} timeout = {300}
                unmountOnExit
                appear  ={true}
                classNames = {{
                    appear:classes.animationContainer__appear,
                    appearActive:classes.animationContainer__appear_active,
                    exit:classes.animationContainer__exit,
                    exitActive:classes.animationContainer__exit_active
                }}
                >
                <div onClick = {(e) => e.stopPropagation()}className = {classes.sideBar__container}>
                    <div className = {classes.list}>
                        <div className = {classes.sideBar__top}>
                            <div className = {classes.burger} onClick = {burgerHandler}>
                                <Burger />
                            </div>
                            <div className = {classes.icon__container}>
                                <YoutubeIcon classModule = {classes.icon__youtube}/>
                            </div>
                        </div>
                    </div>
                    <div className = {`${classes.sideBar__line} ${classes.sideBar__line_first}`}>
                        <div></div>
                    </div>
                    <SideBarContent isPortal = {true}/>
                </div>
                </CSSTransition>
            </div></CSSTransition>, ref.current)
    } else {
        return null;
    }
}

export default React.memo(observer(SideBarPortal))