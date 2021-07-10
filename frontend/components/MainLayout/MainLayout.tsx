import React, { useState } from 'react'
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import SideBarLayout from '../SideBar/SideBarLayout';


const MainLayout:React.FC<{}> = ({children}) => {
    //Открыт - false/Закрыт - true
    const [isOpenSideBar, setOpenSideBar] = useState(false);
    const [isOpenSideBarPortal, setOpenSideBarPortal] = useState(false);

    return <HeaderLayout setOpenSideBar = {setOpenSideBar} setOpenSideBarPortal = {setOpenSideBarPortal}>
        <SideBarLayout 
            setOpenSideBarPortal = {setOpenSideBarPortal} 
            isOpenSideBarPortal = {isOpenSideBarPortal} 
            isOpenSideBar = {isOpenSideBar} 
        >
            {React.Children.map(children,(child) => {
                return React.cloneElement(child as React.ReactElement<any>,{isOpenSideBar})
            })}
        </SideBarLayout>  
    </HeaderLayout>
}

export default MainLayout