import React, { useState } from "react";
import { convertDate } from "../../assets/functions/convertDate";
import { convertNumbers } from "../../assets/functions/convertRating";
import DislikeIcon from "../svg/DislikeIcon";
import LikeIcon from "../svg/LikeIcon";
import classes from "./Comment.module.scss"


const Comment = () => {
    const [rating,setRating] = useState(0)

    const clickHandler = (rating:number) => {
        setRating(state => {
            if(state === rating) {
                return 0
            }
            return rating
        })
    }

    return <div className = {classes.comment}>
        <div className = {classes.comment__container}>
            <div className = {classes.comment__image}>
                <img src={"/imgTest.jpg"} alt={"avatar"} width = {"100%"} height = {"100%"}/>
            </div>
            <div className = {classes.comment__body}>
                <div className = {classes.comment__author}>
                    <span className = {classes.comment__nickname}>
                        nickname
                    </span>
                    <span className = {classes.comment__date}>
                        {convertDate(new Date("2021-06-01"))}
                    </span>
                </div>
                <div className = {classes.comment__text}>
                    Officia esse irure irure nostrud in est qui elit fugiat duis laborum irure aliquip et.
                </div>
                <div className = {classes.comment__rating}>
                    <div className = {classes.comment__likes}>
                        <LikeIcon  onClick = {() => {
                                clickHandler(1)
                            }}
                            classModule = {`${classes.icon__like} ${rating === 1 && classes.icon__like_active}`}
                        />
                        <span>{convertNumbers(50)}</span>
                    </div>
                    <div  className = {classes.comment__dislikes}>
                        <DislikeIcon onClick = {() => {
                                clickHandler(2)
                            }} 
                            classModule = {`${classes.icon__dislike} ${rating === 2 && classes.icon__dislike_active}`}
                        />
                        <span>{convertNumbers(10)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default Comment