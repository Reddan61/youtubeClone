import React from 'react'
import { convertCount } from '../../assets/functions/convertCount'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from "./Profile.module.scss"

interface IProps {
    id: string | string[],
    isOpenSideBar?:boolean
}

const Profile:React.FC<IProps> = ({id,isOpenSideBar}) => {
    const [isLoading] = useScroll()

    return <div className = {classes.profile}>
        <div className = {classes.profile__container}>
            <div className = {`${classes.profile__header} ${!isOpenSideBar && classes.profile__header_open }`}>
                <div className = {`${classes.card} ${isOpenSideBar ? classes.card_close : classes.card_open}`}>
                    <div className = {classes.card__image}>
                        <img src = {"/imgTest.jpg"} alt = {"img"} width = {"100%"} height = {"100%"}/>
                    </div>
                    <div className = {classes.card__content}>
                        <div className = {classes.card__nickname}>
                            nicknameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                        <div className = {classes.card__sub}>
                            {convertCount(1200,true)}
                        </div>
                    </div>
                </div>
            </div>
            <div className = {classes.videos}>
                <div className = {`${classes.videos__container} ${isOpenSideBar ? classes.videos__container_close : classes.videos__container_open}`}>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
                    <VideoPreview little = {true} hideUsername = {true}/>
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


export default Profile