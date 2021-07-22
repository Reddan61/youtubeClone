import SearchIcon from '../svg/SearchIcon';
import UploadIcon from '../svg/UploadIcon';
import YoutubeIcon from '../svg/YoutubeIcon';
import classes from "./headerLayout.module.scss"
import Image from 'next/image'
import React, {useEffect, useState } from 'react';
import AuthButton from '../AuthButton/AuthButton';
import ArrowBackIcon from '../svg/ArrowBackIcon';
import Burger from '../Burger/Burger';
import { useRouter } from "next/router"
import UploadVideo from '../UploadVideo/UploadVideo';
import authReducer from "../../store/authReducer"
import sideBarReducer from '../../store/sideBarReducer';
import { observer } from 'mobx-react-lite';
import { convertAvatarSrc } from '../../assets/functions/convertAvatarSrc';


interface IProps {
    onlyPortal?:boolean
}


const HeaderLayout:React.FC<IProps> = ({children,onlyPortal}) => {
    const router = useRouter()

    const [searchText,setSearchText] = useState('')
    const [isPopUp,setPopUp] = useState(false)

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
        authReducer.initialUser()
        if(router.query.search_query) {
            setSearchText(router.query.search_query as string)
        }
    },[])
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
                            <Image onClick = {() => router.push(`/profile/${authReducer.user.id}`)} className ={classes.right__image} src = {convertAvatarSrc(authReducer.user.avatarSrc)} alt = {"avatar"} layout = {"fixed"} width = {"32"} height = {"32"}/>
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