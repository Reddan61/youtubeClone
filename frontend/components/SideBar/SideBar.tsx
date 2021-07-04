import React, { useState } from "react";
import classes from "./sideBar.module.scss"
import SideBarContent from "./SideBarContent";


interface IProps {
    isOpenSideBar:boolean
}

const SideBar:React.FC<IProps> =({isOpenSideBar}) => {

    return <div className = {`${classes.sideBar} ${isOpenSideBar ? classes.sideBar_active : ""}`}>
        <div className = {classes.sideBar__container}>
            <SideBarContent isOpenSideBar = {isOpenSideBar}/>
        </div>
    </div>
}


export default React.memo(SideBar);