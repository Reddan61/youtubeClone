import React, { useState } from "react"
import HeaderLayout from "../../components/HeaderLayout/HeaderLayout"
import SideBarLayout from "../../components/SideBar/SideBarLayout"
import Subscribers from "../../components/Subscribers/Subscribers";

const Index = () => {
    //Открыт - false/Закрыт - true
    const [isOpenSideBar, setOpenSideBar] = useState(false);
    const [isOpenSideBarPortal, setOpenSideBarPortal] = useState(false);
    
    return <HeaderLayout setOpenSideBar = {setOpenSideBar} setOpenSideBarPortal = {setOpenSideBarPortal}>
        <SideBarLayout 
          setOpenSideBarPortal = {setOpenSideBarPortal} 
          isOpenSideBarPortal = {isOpenSideBarPortal} 
          isOpenSideBar = {isOpenSideBar} 
        >
            <Subscribers isOpenSideBar = {isOpenSideBar}/>
        </SideBarLayout>
    </HeaderLayout>
}


export default Index;