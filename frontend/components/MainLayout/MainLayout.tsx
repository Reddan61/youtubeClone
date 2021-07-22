import React from 'react'
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import SideBarLayout from '../SideBar/SideBarLayout';



interface IProps {
    onlyPortal?:boolean
}

const MainLayout:React.FC<IProps> = ({children,onlyPortal}) => {
   
    return <HeaderLayout onlyPortal = {onlyPortal} >
        <SideBarLayout  onlyPortal = {onlyPortal} >
            {children}
            {/* {React.Children.map(children,(child) => {
                return React.cloneElement(child as React.ReactElement<any>,{isOpenSideBar:sideBarReducer.isOpenSideBar})
            })} */}
        </SideBarLayout>  
    </HeaderLayout>
}

export default MainLayout