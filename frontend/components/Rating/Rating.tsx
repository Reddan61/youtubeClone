import React, { useEffect, useRef, useState } from "react";
import { convertNumbers } from "../../assets/functions/convertRating";
import DislikeIcon from "../svg/DislikeIcon";
import LikeIcon from "../svg/LikeIcon";
import classes from "./Rating.module.scss"

interface IProps {
    likes:number,
    dislikes:number,
    rating?:number
}

const Rating:React.FC<IProps> = ({likes,dislikes,rating = 0}) => {
    const likesRef = useRef<HTMLDivElement>(null)
    const dislikesRef = useRef<HTMLDivElement>(null)
    const [isLiked,setLike] = useState(rating)

   
    const clickHandler = (rating:number) => {
        setLike(state => {
            if(state === rating) {
                return 0
            }
            return rating
        })
    }
    useEffect(() => {
        const sum = likes + dislikes
        const percentLikes = (likes/sum) * 100
        const percentDislikes = (dislikes/sum) * 100
        likesRef.current.style.width = percentLikes + "%"
        dislikesRef.current.style.width = percentDislikes + "%"
    },[])

    return <div className = {classes.rating}>
        <div className = {classes.rating__container}>
            <div className = {classes.rating__main}>
                <div className = {classes.rating__likes}>
                    <LikeIcon onClick = {() => {
                        clickHandler(1)
                    }} classModule = {`${classes.icon__like} ${isLiked === 1 && classes.icon__like_active}`}/>
                    <span>{convertNumbers(likes)}</span>
                </div>
                <div className = {classes.rating__dislikes}>
                    <DislikeIcon onClick = {() => {
                        clickHandler(2)
                    }} classModule = {`${classes.icon__dislike} ${isLiked === 2 && classes.icon__dislike_active}`}/>
                    <span>{convertNumbers(dislikes)}</span>
                </div>
            </div>
            <div className = {classes.line}>
                <div ref = {likesRef} className = {`${classes.line__like} ${isLiked !== 0 && classes.line__like_active}`}>
                </div>
                <div ref = {dislikesRef}>
                </div>
            </div>
        </div>
    </div>
}


export default Rating