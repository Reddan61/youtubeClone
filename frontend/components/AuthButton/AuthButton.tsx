import React from "react";
import UserIcon from "../svg/UserIcon";
import classes from "./authButton.module.scss"

const AuthButton = () => {
    return <div className = {classes.authButton}>
        <div  className = {classes.authButton__container}>
            <UserIcon classModule = {classes.icon}/>
            <span>Войти</span>
        </div>
    </div>
}

export default AuthButton;