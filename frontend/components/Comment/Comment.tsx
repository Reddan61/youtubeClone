import { observer } from "mobx-react-lite";
import Router from "next/router";
import React from "react";
import { convertAvatarSrc } from "../../assets/functions/convertAvatarSrc";
import { convertDate } from "../../assets/functions/convertDate";
import { convertNumbers } from "../../assets/functions/convertRating";
import videoReducer, { IComment } from "../../store/videoReducer";
import DislikeIcon from "../svg/DislikeIcon";
import LikeIcon from "../svg/LikeIcon";
import classes from "./Comment.module.scss"

interface IProps {
    comment: IComment
}

const Comment:React.FC<IProps> = ({comment}) => {
    const { user, rating, text, date, videoId, _id } = comment

    const clickHandler = async (rating: 1 | 2) => {
        const response = await videoReducer.commentRating(_id,rating)
    }

    return <div className = {classes.comment}>
        <div className = {classes.comment__container}>
            <div onClick = {() => Router.push(`/profile/${user._id}`)} className = {classes.comment__image}>
                <img src={convertAvatarSrc(user.avatar)} alt={"avatar"} width = {"100%"} height = {"100%"}/>
            </div>
            <div className = {classes.comment__body}>
                <div className = {classes.comment__author}>
                    <span onClick = {() => Router.push(`/profile/${user._id}`)} className = {classes.comment__nickname}>
                        {`${user.name} ${user.secondName}`}
                    </span>
                    <span className = {classes.comment__date}>
                        {convertDate(date)}
                    </span>
                </div>
                <div className = {classes.comment__text}>
                    {text}
                </div>
                <div className = {classes.comment__rating}>
                    <div className = {classes.comment__likes}>
                        <LikeIcon  onClick = {() => {
                                clickHandler(1)
                            }}
                            classModule = {`${classes.icon__like} ${rating.rating === 1 && classes.icon__like_active}`}
                        />
                        <span>{convertNumbers(rating.likes)}</span>
                    </div>
                    <div  className = {classes.comment__dislikes}>
                        <DislikeIcon onClick = {() => {
                                clickHandler(2)
                            }} 
                            classModule = {`${classes.icon__dislike} ${rating.rating === 2 && classes.icon__dislike_active}`}
                        />
                        <span>{convertNumbers(rating.dislikes)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default observer(Comment)