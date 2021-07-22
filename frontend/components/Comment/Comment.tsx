import Router from "next/router";
import React, { useState } from "react";
import { convertAvatarSrc } from "../../assets/functions/convertAvatarSrc";
import { convertDate } from "../../assets/functions/convertDate";
import { convertNumbers } from "../../assets/functions/convertRating";
import { IComment } from "../../store/videoReducer";
import DislikeIcon from "../svg/DislikeIcon";
import LikeIcon from "../svg/LikeIcon";
import classes from "./Comment.module.scss"

interface IProps {
    item: IComment
}

const Comment:React.FC<IProps> = ({item}) => {
    const {avatarSrc,userId,text,date,dislikes,likes,nickname,rating} = item



    const clickHandler = (rating:number) => {

        // setRating(state => {
        //     if(state === rating) {
        //         return 0
        //     }
        //     return rating
        // })
    }

    return <div className = {classes.comment}>
        <div className = {classes.comment__container}>
            <div onClick = {() => Router.push(`/profile/${userId}`)} className = {classes.comment__image}>
                <img src={convertAvatarSrc(avatarSrc)} alt={"avatar"} width = {"100%"} height = {"100%"}/>
            </div>
            <div className = {classes.comment__body}>
                <div className = {classes.comment__author}>
                    <span onClick = {() => Router.push(`/profile/${userId}`)} className = {classes.comment__nickname}>
                        {nickname}
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
                            classModule = {`${classes.icon__like} ${rating === 1 && classes.icon__like_active}`}
                        />
                        <span>{convertNumbers(likes)}</span>
                    </div>
                    <div  className = {classes.comment__dislikes}>
                        <DislikeIcon onClick = {() => {
                                clickHandler(2)
                            }} 
                            classModule = {`${classes.icon__dislike} ${rating === 2 && classes.icon__dislike_active}`}
                        />
                        <span>{convertNumbers(dislikes)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default Comment