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
        {isOpenSideBarPortal && 
            <SideBarPortal setOpenSideBarPortal = {setOpenSideBarPortal}/>
        }
        
        <main className = {classes.main}>
            {React.Children.map(children,(child) => {
                return React.cloneElement(child as React.ReactElement<any>,{isOpenSideBar})
            })}
        </main>
    </div>
}


export default SideBarLayout;