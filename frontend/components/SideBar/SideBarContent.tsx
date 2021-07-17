import React, { useEffect, useState } from "react"
import AuthButton from "../AuthButton/AuthButton";
import ClockIcon from "../svg/ClockIcon";
import HistoryIcon from "../svg/HistoryIcon";
import HomeIcon from "../svg/HomeIcon";
import LikeIcon from "../svg/LikeIcon";
import YouTubeListIcon from "../svg/YouTubeListIcon";
import classes from "./SideBarContent.module.scss"
import Image from 'next/image'
import Router from "next/router"

interface IProps {
    isOpenSideBar?:boolean,
    isPortal?:boolean
}


const SideBarContent:React.FC<IProps> = ({isOpenSideBar = false,isPortal = false}) => {
    const [isAuth,setAuth] = useState(true)
    const [path,setPath] = useState(null)
    const [isSubOpen,setIsSubOpen] = useState(false)
    const urlParse = () => {
        const pathname = Router.pathname; 
        const parsedPath = pathname.slice(1,pathname.indexOf('/',1) !== -1 ?pathname.indexOf('/',1) : pathname.length );

        return parsedPath
    }
    const subListHandler = () => {
        setIsSubOpen(!isSubOpen)
    }
    const redirect = (url:string) => {
        Router.push(url)
    }

    useEffect(() => {
        setPath(urlParse())
    },[])
    return <div className = {`${classes.sideBarContent} ${isOpenSideBar && classes.sideBarContent_active} ${!isPortal && classes.sideBarContent_notPortal}`}>
    <div className = {classes.sideBarContent__activeList}>
        <ul className = {`${classes.list} ${!isPortal && classes.list_notPortal}`}>
            <li onClick = {() => {redirect("/")}} data-title = {"Главная"}
                className = {`${classes.list__item} ${path === "" && classes.list__item_active}`}>
                <HomeIcon classModule = {`${classes.icon} ${!isPortal && classes.icon_notPortal}`}/>
                <span className = {`showTitle`}>Главная</span>
            </li>
            <li onClick = {() => redirect("/subscribers")} data-title = {"Подписки"} className = {`${classes.list__item} ${path === "subscribers" && classes.list__item_active}`}>
                <YouTubeListIcon classModule = {`${classes.icon} ${!isPortal && classes.icon_notPortal}`}/>
                <span className = {`showTitle`}>Подписки</span>
            </li>
        </ul>
    </div>
    <div className = {`${classes.sideBarContent__line} ${!isPortal && classes.sideBarContent__line_notPortal}`}>
        <div></div>
    </div>
    <div className = {classes.sideBarContent__addedList}>
        <ul className = {`${classes.list} ${!isPortal && classes.list_notPortal}`}>
            <li onClick = {() => redirect("/history")} className = {`${classes.list__item} ${path === "history" && classes.list__item_active}`}>
                <HistoryIcon classModule = {`${classes.icon} ${!isPortal && classes.icon_notPortal}`}/>
                <span className = {`showTitle`}>История</span>
            </li>
            {
                isAuth && <>
                    <li  onClick = {() => redirect("/later")} className = {`${classes.list__item} ${path === "later" && classes.list__item_active}`}>
                        <ClockIcon classModule = {`${classes.icon} ${!isPortal && classes.icon_notPortal}`}/>
                        <span className = {`showTitle`}>Смотреть позже</span>
                    </li>
                    <li onClick = {() => redirect("/liked")} className = {`${classes.list__item} ${path === "liked" && classes.list__item_active}`}>
                        <LikeIcon classModule = {`${classes.icon} ${!isPortal && classes.icon_notPortal}`}/>
                        <span className = {`showTitle`}>Понравившиеся</span>
                    </li>
                </>
            }
            
        </ul>
    </div>
    <div className = {`${classes.sideBarContent__line} ${!isPortal && classes.sideBarContent__line_notPortal}`}>
        <div></div>
    </div>
    {isAuth &&
    <div className = {`${classes.sideBarContent__subscribers} ${!isPortal && classes.sideBarContent__subscribers_notPortal} ${classes.subscribers}`}>
        <div className = {classes.subscribers__container}>
            <div className = {classes.subscribers__title}>
                <span>Подписки</span>
            </div>
            <div >
                <ul className = {classes.list}>
                    <li className = {`${classes.list__item}`}>
                        <Image className = {classes.subscribers__image} src = {"/imgTest.jpg"} layout = {"fixed"} alt = {"picture"} width = {25} height = {25}/>
                        <span className = {`showTitle`}>названиеaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                    </li>
                    <li className = {`${classes.list__item}`}>
                        <Image className = {classes.subscribers__image} src = {"/imgTest.jpg"} layout = {"fixed"} alt = {"picture"}width = {25} height = {25}/>
                        <span className = {`showTitle`}>названиеaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                    </li>
                    <li className = {`${classes.list__item}`}>
                        <Image className = {classes.subscribers__image} src = {"/imgTest.jpg"} layout = {"fixed"} alt = {"picture"}width = {25} height = {25}/>
                        <span className = {`showTitle`}>название</span>
                    </li>
                    <li className = {`${classes.list__item}`}>
                        <Image className = {classes.subscribers__image} src = {"/imgTest.jpg"} layout = {"fixed"} alt = {"picture"} width = {25} height = {25}/>
                        <span className = {`showTitle`}>название</span>
                    </li>
                    
            
                </ul>
            </div>
            <div onClick = {subListHandler} className = {classes.subscribers__button}>
                <div className = {`${classes.arrow} ${isSubOpen && classes.arrow_active}`}></div>
                <span className = {`showTitle`}>{isSubOpen ? "Свернуть" : "Показать еще 15 каналов"}</span>
            </div>
        </div>
    </div>
    }
    {!isAuth && !isOpenSideBar && <>
        <div className = {`${classes.sideBarContent__auth} ${!isPortal && classes.sideBarContent__auth_notPortal}`}>
            <span>
                Вы сможете ставить отметки 
                "Нравится", писать комментарии
                и подписываться на каналы.
            </span>
            <div>
                <AuthButton />
            </div>
        </div>
    </>}
</div>
}


export default SideBarContent;