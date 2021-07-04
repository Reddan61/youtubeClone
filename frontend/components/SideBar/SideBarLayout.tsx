import classes from "./sideBarLayout.module.scss";
import React from "react";
import SideBar from "./SideBar";
import SideBarPortal from "./SideBarPortal";

interface IProps {
    isOpenSideBar:boolean,
    isOpenSideBarPortal:boolean,
    setOpenSideBarPortal: (fun:(state:boolean) => boolean) => void
}

const SideBarLayout:React.FC<IProps> =({children,isOpenSideBar,setOpenSideBarPortal,isOpenSideBarPortal}) => {
    return <div className = {classes.root}>
        <SideBar isOpenSideBar = { isOpenSideBar }/>
        <SideBarPortal isOpenSideBarPortal = {isOpenSideBarPortal} setOpenSideBarPortal = {setOpenSideBarPortal}/>
        
        <main className = {classes.main}>
            {children}
        </main>
    </div>
}


export default SideBarLayout;