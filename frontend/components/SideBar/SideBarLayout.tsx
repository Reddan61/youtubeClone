import classes from "./sideBarLayout.module.scss";
import React from "react";
import SideBar from "./SideBar";
import SideBarPortal from "./SideBarPortal";
import { observer } from "mobx-react-lite";
import sideBarReducer from "../../store/sideBarReducer"

interface IProps {
    onlyPortal?:boolean
}

const SideBarLayout:React.FC<IProps> =({children,onlyPortal = false}) => {
    
    return <div className = {classes.root}>
        {!onlyPortal && <SideBar />}
        {sideBarReducer.isOpenSideBarPortal && 
            <SideBarPortal/>
        }
        
        <main className = {classes.main}>
            {React.Children.map(children,(child) => {
                return React.cloneElement(child as React.ReactElement<any>,{isOpenSideBar:sideBarReducer.changeOpenSideBar})
            })}
        </main>
    </div>
}


export default observer(SideBarLayout)