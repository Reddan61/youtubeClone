import React, { useEffect, useRef } from 'react'
import { convertCount } from '../../assets/functions/convertCount'
import { useScroll } from '../Hook/useScroll'
import LoaderIcon from '../svg/LoaderIcon'
import VideoPreview from '../VideoPreview/VideoPreview'
import classes from "./Profile.module.scss"
import sideBarReducer from "../../store/sideBarReducer"
import profileReducer, { IProfile } from '../../store/profileReducer'
import { convertAvatarSrc } from '../../assets/functions/convertAvatarSrc'
import { observer } from 'mobx-react-lite'
import { IVideo } from '../../store/videoListReducer'
import { useRouter } from 'next/router'


const Profile:React.FC<{
    profile:IProfile,
    videos:IVideo[],
    totalPages:number
}> = ({...props}) => {
    const [isLoading] = useScroll(profileReducer.addVideoProfile.bind(profileReducer))
    
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const avatarUpload = async (e:any) => {
        e.preventDefault()
        
        const extensions = ["image/png","image/jpg","image/jpeg"]
        const file = e.target.files
        
        if(!extensions.includes(file[0].type)) {
            alert("Неправильный формат!")
            return
        }

        const response = await profileReducer.changeAvatar(file[0])
        
        if(response.message !== "success") {
            alert("Что-то пошло не так!")
        }
    }

    useEffect(() => {
        profileReducer.setInitialState(props.profile,props.videos,props.totalPages)
    },[])

    useEffect(() => {
        (async function() {
            if(!router.query.id) {
                alert("Что-то пошло не так!")
                return
            }
            await profileReducer.getUser(router.query.id as string)
            await profileReducer.getVideoProfile(1)
        })() 
    },[router.query.id])
    
    return <div className = {classes.profile}>
        <div className = {classes.profile__container}>
            <div className = {`${classes.profile__header} ${!sideBarReducer.isOpenSideBar && classes.profile__header_open }`}>
                <div className = {`${classes.card} ${sideBarReducer.isOpenSideBar ? classes.card_close : classes.card_open}`}>
                    <div className = {classes.card__image}>
                        {/* Для получения картинки */}
                        <input 
                            ref = {inputRef} type = {"file"} style = {{display:"none"}}
                            onChange = {avatarUpload}
                        />
                        <img src = {convertAvatarSrc(
                                profileReducer.user ? 
                                    profileReducer.user.avatar
                                :
                                    props.profile.avatar
                            )} alt = {"img"} width = {"100%"} height = {"100%"}
                            onClick = {() => {
                                inputRef.current.click()
                            }}
                        />
                    </div>
                    <div className = {classes.card__content}>
                        <div className = {classes.card__nickname}>
                            {`${props.profile.name} ${props.profile.secondName}`}
                        </div>
                        <div className = {classes.card__sub}>
                            {convertCount(props.profile.subscribersCount,true)}
                        </div>
                    </div>
                </div>
            </div>
            <div className = {classes.videos}>
                <div className = {`${classes.videos__container} ${sideBarReducer.isOpenSideBar ? classes.videos__container_close : classes.videos__container_open}`}>
                    {
                        profileReducer.videos?
                            profileReducer.videos.map(el => {
                                return <VideoPreview key = {el._id} little = {true} hideUsername = {true}
                                        video = {el}
                                    />
                            })
                        : 
                            props.videos.map(el => {
                                return <VideoPreview key = {el._id} little = {true} hideUsername = {true}
                                    video = {el}
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