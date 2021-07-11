import React, { useState } from 'react'
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import SideBarLayout from '../SideBar/SideBarLayout';

interface IProps {
    onlyPortal?:boolean
}

const MainLayout:React.FC<IProps> = ({children,onlyPortal}) => {
    //Открыт - false/Закрыт - true
    const [isOpenSideBar, setOpenSideBar] = useState(false);
    const [isOpenSideBarPortal, setOpenSideBarPortal] = useState(false);

    return <HeaderLayout setOpenSideBar = {setOpenSideBar} setOpenSideBarPortal = {setOpenSideBarPortal}
        onlyPortal = {onlyPortal}
    >
        <SideBarLayout 
            setOpenSideBarPortal = {setOpenSideBarPortal} 
            isOpenSideBarPortal = {isOpenSideBarPortal} 
            isOpenSideBar = {isOpenSideBar} 
            onlyPortal = {onlyPortal}
        >
            {React.Children.map(children,(child) => {
                return React.cloneElement(child as React.ReactElement<any>,{isOpenSideBar})
            })}
        </SideBarLayout>  
    </HeaderLayout>
}

export default MainLayout