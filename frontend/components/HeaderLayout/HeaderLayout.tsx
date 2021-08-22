import SearchIcon from '../svg/SearchIcon';
import UploadIcon from '../svg/UploadIcon';
import YoutubeIcon from '../svg/YoutubeIcon';
import classes from "./headerLayout.module.scss"
import Image from 'next/image'
import React, {useCallback, useEffect, useState } from 'react';
import AuthButton from '../AuthButton/AuthButton';
import ArrowBackIcon from '../svg/ArrowBackIcon';
import Burger from '../Burger/Burger';
import { useRouter } from "next/router"
import UploadVideo from '../UploadVideo/UploadVideo';
import authReducer from "../../store/authReducer"
import sideBarReducer from '../../store/sideBarReducer';
import { observer } from 'mobx-react-lite';
import { convertAvatarSrc } from '../../assets/functions/convertAvatarSrc';
import ProfileIcon from '../svg/ProfileIcon';
import ExitIcon from '../svg/ExitIcon';


interface IProps {
    onlyPortal?:boolean
}


const HeaderLayout:React.FC<IProps> = ({children,onlyPortal}) => {
    const router = useRouter()

    const [searchText,setSearchText] = useState('')
    const [isPopUp,setPopUp] = useState(false)

    const [isOpenMenu, setOpenMenu] = useState(false)

    //Отправка на api get search
    const sendSearch = () => {
        if(searchText.trim().length !== 0) {
            router.push(`/search/${searchText}`)
        }
    }

    function openSideBarHandler() {
        if(onlyPortal) {
            sideBarReducer.changeOpenSideBarPortal()
            return
        }
        if (window.innerWidth > 1000) {
            sideBarReducer.changeOpenSideBar()
        } else {
            sideBarReducer.changeOpenSideBarPortal()
        }
    }

    useEffect(() => {
        if(router.query.search_query) {
            setSearchText(router.query.search_query as string)
        }
    },[])

    const conditionMenu = useCallback(() => {
        setOpenMenu(state => !state)
    },[])

    useEffect(() => {
        if(isOpenMenu) {
            document.documentElement.style.overflow = "hidden"
            document.addEventListener("click",conditionMenu)
        }
        return () => {
            document.documentElement.style.overflow = "auto"
            document.removeEventListener("click",conditionMenu)
        }
    },[isOpenMenu])
    return <div className = {classes.headerLayout}>
        <nav className = {classes.nav}>
            <div className = {classes.container}>
                {/* Работает как переключатель */}
                <input type = {"checkbox"} id = {"checkBox-label"} className= {classes.checkBox_label} />
                <div className = {classes.left}>
                    <label htmlFor = {"checkBox-label"}>
                        <div>
                            <ArrowBackIcon  classModule = {classes.icon__arrowBack}/>
                        </div>
                    </label>
                    <div className = {classes.burger} onClick = {openSideBarHandler}>
                        <Burger />
                    </div>
                    <div className = {classes.icon__container} onClick = {() => router.push("/")}>
                        <YoutubeIcon classModule = {classes.icon__youtube}/>
                    </div>
                </div>
                <div className = {classes.center}>
                    <input value = {searchText} onChange = {(e) => {setSearchText(e.target.value)}} placeholder = {"Введите запрос"}/>
                    <button onClick = {sendSearch}> 
                        <SearchIcon  classModule = {classes.icon__search} />
                    </button>
                </div>
                {/* Покажется при адаптиве  */}
                <div className = {classes.right}>
                    <label htmlFor = {"checkBox-label"}>
                        <div className = {classes.right__searchIcon}>
                            <SearchIcon  classModule = {classes.icon__search}/>
                        </div>
                    </label>
                    {
                        authReducer.isAuth ? <>
                            <UploadIcon onClick = {() => setPopUp(true)} classModule = {classes.icon__upload}/>
                            <Image onClick = {() => {
                                setOpenMenu(!isOpenMenu)
                            }} className ={classes.right__image} loader = {() => convertAvatarSrc(authReducer.user?.avatar)} src = {convertAvatarSrc(authReducer.user?.avatar)} alt = {"avatar"} layout = {"fixed"} width = {"32"} height = {"32"}/>
                            {isOpenMenu && <ul className = {classes.right__list}>
                                <li onClick = {() => {
                                    router.push(`/profile/${authReducer.user._id}`)
                                }}>
                                    <ProfileIcon classModule = {classes.icon__profile}/>
                                    Профиль
                                </li>
                                <li onClick = {() => {
                                    authReducer.logout()
                                }}>
                                    <ExitIcon classModule = {classes.icon__exit}/>
                                    Выйти
                                </li>
                            </ul>}
                        </>
                        : <div className = {classes.right__auth}>
                            <AuthButton />
                        </div>
                    }
                </div>
            </div>
            { isPopUp && 
                <UploadVideo setPopUp = {setPopUp}/>
            }
        </nav>
        <main className = {classes.main}>
            {children}
        </main>
    </div>
}

export default observer(HeaderLayout);