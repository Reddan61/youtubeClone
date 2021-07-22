import React, { useState } from "react";
import classes from "./sideBar.module.scss"
import SideBarContent from "./SideBarContent";
import sideBarReducer from "../../store/sideBarReducer"
import { observer } from "mobx-react-lite";

interface IProps {
   
}

const SideBar:React.FC<IProps> =({}) => {
    
    return <div className = {`${classes.sideBar} ${sideBarReducer.isOpenSideBar ? classes.sideBar_active : ""}`}>
        <div className = {classes.sideBar__container}>
            <SideBarContent/>
        </div>
    </div>
}


export default React.memo(observer(SideBar))