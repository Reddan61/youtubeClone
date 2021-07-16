import React, { useEffect, useState } from 'react'
import YouTubeListIcon from '../svg/YouTubeListIcon'
import classes from "./NonAuth.module.scss"
import Router from "next/router"
import HistoryIcon from '../svg/HistoryIcon'
import AuthButton from '../AuthButton/AuthButton'

const NonAuth = () => {
    const [path,setPath] = useState(null)

    const urlParse = () => {
        const pathname = Router.pathname; 
        const parsedPath = pathname.slice(1,pathname.indexOf('/',1) !== -1 ?pathname.indexOf('/',1) : pathname.length );

        return parsedPath
    }

    useEffect(() => {
        setPath(urlParse)
    },[])
    return <div className = {classes.nonAuth}>
        <div className = {classes.nonAuth__container}>
            <div className = {classes.nonAuth__icon}>
                {
                    path === "subscribers" &&
                    <YouTubeListIcon classModule = {classes.nonAuth__icon}/>
                }
                {
                    path === "history" &&
                    <HistoryIcon classModule = {classes.nonAuth__icon}/>
                }
            </div>
            <div className = {classes.nonAuth__title}>
                {
                    path === "subscribers" &&
                    "Войдите в аккаунт"
                }
                {
                    path === "history" &&
                    "История поиска и просмотра недоступна"
                }
            </div>
            <div className = {classes.nonAuth__text}>
            {
                    path === "subscribers" &&
                    "Тогда в этом разделе появятся новые видео с каналов, на которые вы подписаны."
                }
                {
                    path === "history" &&
                    "Чтобы посмотреть историю просмотра, войдите в аккаунт."
                }
               
            </div>
            <div className = {classes.nonAuth__button}>
                <AuthButton />
            </div>
        </div>
    </div>
}

export default NonAuth