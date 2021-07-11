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

interface IProps {
    onlyPortal?:boolean,
    setOpenSideBar: (fun:(state:boolean)=>boolean) => void,
    setOpenSideBarPortal: (fun:(state:boolean)=>boolean) => void,
}


const HeaderLayout:React.FC<IProps> = ({children, setOpenSideBar,setOpenSideBarPortal,onlyPortal}) => {
    const [isAuth,setAuth] = useState(true)
    const router = useRouter()
    
    const [searchText,setSearchText] = useState('')
    //Отправка на api get search
    const sendSearch = () => {
        if(searchText.trim().length !== 0) {
            router.push(`/search/${searchText}`)
        }
    }

    function openSideBarHandler() {
        if(onlyPortal) {
            setOpenSideBarPortal((prevState) => !prevState)
            return
        }
        if (window.innerWidth > 1000) {
            setOpenSideBar((prevState) => !prevState)
        } else {
            setOpenSideBarPortal((prevState) => !prevState)
        }
    }

    useEffect(() => {
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
                        isAuth ? <>
                            <UploadIcon classModule = {classes.icon__upload}/>
                            <Image className ={classes.right__image} src = {"/imgTest.jpg"} alt = {"avatar"} layout = {"fixed"} width = {"32"} height = {"32"}/>
                        </>
                        : <div className = {classes.right__auth} onClick = {() => router.push('/login')}>
                            <AuthButton />
                        </div>
                    }
                </div>
            </div>
            
        </nav>
        <main className = {classes.main}>
            {children}
        </main>
    </div>
}

export default HeaderLayout;