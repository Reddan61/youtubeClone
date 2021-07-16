import React from "react";
import UserIcon from "../svg/UserIcon";
import classes from "./authButton.module.scss"
import Router from "next/router";

const AuthButton = () => {
    return <div className = {classes.authButton}>
        <div onClick = {() => {Router.push('/login')}} className = {classes.authButton__container}>
            <UserIcon classModule = {classes.icon}/>
            <span>Войти</span>
        </div>
    </div>
}

export default AuthButton;