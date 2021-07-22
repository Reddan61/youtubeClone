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
import authReducer from "../../store/authReducer"
import sideBarReducer from "../../store/sideBarReducer"
import { observer } from "mobx-react-lite";
import { convertAvatarSrc } from "../../assets/functions/convertAvatarSrc";

interface IProps {
    isPortal?:boolean
}


const SideBarContent:React.FC<IProps> = ({isPortal = false}) => {
    const [path,setPath] = useState(null)
    const [isSubOpen,setIsSubOpen] = useState(false)
    
    const urlParse = () => {
        const pathname = Router.pathname; 
        const parsedPath = pathname.slice(1,pathname.indexOf('/',1) !== -1 ?pathname.indexOf('/',1) : pathname.length );

        return parsedPath
    }
    const subListHandler = async () => {
        if (!isSubOpen) {
            await sideBarReducer.addSubscribers()
        } else {
            await sideBarReducer.getInitialSub()
        }
        setIsSubOpen(!isSubOpen)
    }
    const redirect = (url:string) => {
        Router.push(url)
    }

    useEffect(() => {
        (async function() {
            await sideBarReducer.getInitialSub()
        })()

        setPath(urlParse())
    },[])
    return <div className = {`${classes.sideBarContent} ${sideBarReducer.isOpenSideBar && classes.sideBarContent_active} ${!isPortal && classes.sideBarContent_notPortal}`}>
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
                authReducer.isAuth && <>
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
    {authReducer.isAuth &&
    <div className = {`${classes.sideBarContent__subscribers} ${!isPortal && classes.sideBarContent__subscribers_notPortal} ${classes.subscribers}`}>
        <div className = {classes.subscribers__container}>
            <div className = {classes.subscribers__title}>
                <span>Подписки</span>
            </div>
            <div >
                <ul className = {classes.list}>
                    {
                        sideBarReducer.subscribers.map(el => {
                            return <SubscribeItem key = {el.userId}
                                userdId = {el.userId} avatarSrc = {el.avatarSrc}
                                nickname = {el.nickname} 
                            />
                        }
                    )
                    }
                </ul>
            </div>
            <div onClick = {subListHandler} className = {classes.subscribers__button}>
                <div className = {`${classes.arrow} ${isSubOpen && classes.arrow_active}`}></div>
                <span className = {`showTitle`}>{isSubOpen ? "Свернуть" : `Показать еще ${sideBarReducer.moreCountSub} каналов`}</span>
            </div>
        </div>
    </div>
    }
    {!authReducer.isAuth && !sideBarReducer.isOpenSideBar && <>
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

interface ISiberBarItemProps {
    userdId:string,
    avatarSrc:string,
    nickname:string
}

const SubscribeItem:React.FC<ISiberBarItemProps> = ({userdId,avatarSrc,nickname}) => {

    return <li onClick = {() => Router.push(`/profile/${userdId}`)} className = {`${classes.list__item}`}>
        <Image className = {classes.subscribers__image} src = {convertAvatarSrc(avatarSrc)} layout = {"fixed"} alt = {"picture"} width = {25} height = {25}/>
        <span className = {`showTitle`}>{nickname}</span>
    </li>
}




export default observer(SideBarContent)