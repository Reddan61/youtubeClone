import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Burger from "../Burger/Burger";
import YoutubeIcon from "../svg/YoutubeIcon";
import classes from "./sideBarPortal.module.scss"
import {CSSTransition } from "react-transition-group"
import SideBarContent from "./SideBarContent";

interface IProps {
    isOpenSideBarPortal:boolean,
    setOpenSideBarPortal: (fun:(state:boolean) => boolean) => void
}

const SideBarPortal:React.FC<IProps> = ({setOpenSideBarPortal,isOpenSideBarPortal}) => {
    const [isBrowser,setIsBrowser] = useState(false)     
    const ref = useRef<HTMLDivElement>(null)
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
            <CSSTransition  in = {isOpenSideBarPortal} timeout = {300}
                unmountOnExit
                classNames = {{
                    enter:classes.animationRoot__enter,
                    enterActive:classes.animationRoot__enter_active,
                    exit:classes.animationRoot__exit,
                    exitActive:classes.animationRoot__exit_active
                }}
            >
            <div className = {classes.sideBar}>
            <CSSTransition in = {isOpenSideBarPortal} timeout = {300}
                unmountOnExit
                appear  ={true}
                classNames = {{
                    appear:classes.animationContainer__appear,
                    appearActive:classes.animationContainer__appear_active,
                    exit:classes.animationContainer__exit,
                    exitActive:classes.animationContainer__exit_active
                }}
                >
                <div className = {classes.sideBar__container}>
                    <div className = {classes.list}>
                        <div className = {classes.sideBar__top}>
                            <div className = {classes.burger} onClick = {() => setOpenSideBarPortal(state => !state)}>
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

export default React.memo(SideBarPortal);