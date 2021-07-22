import React, { useEffect, useState } from 'react'
import { convertCount } from '../../assets/functions/convertCount'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from "./Profile.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import profileReducer, { IProfile } from '../../store/profileReducer'
import { convertAvatarSrc } from '../../assets/functions/convertAvatarSrc'
import { observer } from 'mobx-react-lite'



const Profile:React.FC<IProfile> = ({...props}) => {
    const [isLoading] = useScroll(profileReducer.addVideoList.bind(profileReducer))
    const [isBrowser,setBrowser] = useState(false)
    const user = isBrowser ? profileReducer.user : props 
    
    useEffect(() => {
        profileReducer.setInitialState(user)
        setBrowser(true)
    },[])
    
    return <div className = {classes.profile}>
        <div className = {classes.profile__container}>
            <div className = {`${classes.profile__header} ${!sideBarReducer.isOpenSideBar && classes.profile__header_open }`}>
                <div className = {`${classes.card} ${sideBarReducer.isOpenSideBar ? classes.card_close : classes.card_open}`}>
                    <div className = {classes.card__image}>
                        <img src = {convertAvatarSrc(user?.avatarSrc)} alt = {"img"} width = {"100%"} height = {"100%"}/>
                    </div>
                    <div className = {classes.card__content}>
                        <div className = {classes.card__nickname}>
                            {user?.nickname}
                        </div>
                        <div className = {classes.card__sub}>
                            {convertCount(user?.subscribersCount,true)}
                        </div>
                    </div>
                </div>
            </div>
            <div className = {classes.videos}>
                <div className = {`${classes.videos__container} ${sideBarReducer.isOpenSideBar ? classes.videos__container_close : classes.videos__container_open}`}>
                    {
                        user?.videoList.map(el => {
                            return <VideoPreview key = {el.id} little = {true} hideUsername = {true}
                                id = {el.id} author = {el.author} date = {el.date} delay = {el.delay}
                                previewsSrc = {el.previewsSrc} userId = {el.userId} 
                                videoTitle = {el.videoTitle} viewersCount = {el.viewersCount} videoPreview = {el.videoPreview}
                            />
                        })
                    }
                </div>
                {isLoading &&
                    <div className = {classes.profile__bottom}>
                        <LoaderIcon classModule = {classes.profile__loader}/>
                    </div>
                }
            </div>

        </div>
    </div>
}


export default observer(Profile)