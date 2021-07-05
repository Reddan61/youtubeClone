import React, { useState } from "react"
import Input from "../Formik/Input";
import classes from "./Login.module.scss"
import {CSSTransition} from "react-transition-group"
import UserAvatarIcon from "../svg/UserAvatarIcon";
import ArrowDownIcon from "../svg/ArrowDownIcon";
import CheckBox from "../Formik/CheckBox";
import Router from "next/router"
import GoogleIcon from "../svg/GoogleIcon";

const LoginPage = () => {
    const [isMailWritten,setMailWritten] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const handleClick = (bool:boolean) => {
        setLoading(true);
        setTimeout(() => {
            setMailWritten(bool)
            setTimeout(() =>{
                setLoading(false);
            },1000)
        },2000)
    }

    return <div className = {classes.login}>
        {isLoading && <div className = {classes.progress}>
                <div className = {classes.progress__slide}>
                </div>
            </div>}
        <div className = {classes.login__container}>
            {isLoading && <div className = {classes.login__loading}></div>}
            <div className = {classes.login__top}>
                {isMailWritten ? 
                    <>
                        <GoogleIcon classModule = {classes.icon__google}/>
                        <h1>Добро пожаловать!</h1>
                        <div className = {classes.login__email} onClick = {() => handleClick(false)}>
                            <UserAvatarIcon classModule = {classes.icon__avatar}/>
                            <span>Random@Mail.ru</span>
                            <ArrowDownIcon classModule = {classes.icon__arrowDown}/>
                        </div>
                    </>
                :
                    <>
                        <GoogleIcon classModule = {classes.icon__google}/>
                        <h1>Вход</h1>
                        <span>Перейдите на YouTube</span>
                    </>
                }
            </div>
            <div className = {classes.forms}>
                <CSSTransition in = {isMailWritten === false} timeout = {300} unmountOnExit
                    classNames = {{
                        enter:classes.animation__enter,
                        enterActive:classes.animation__enter_active,
                        exit:classes.animation__exit,
                        exitActive:classes.animation__exit_active
                    }}>
                    <div className = {classes.login__form}>
                        <Input classModule = {classes.login__input} placeholder = {"Телефон или адрес эл.почты"}/>
                        <div className = {classes.login__buttons}>
                            <button className = {classes.login__create} onClick = {() => Router.push("/register")}>Создать аккаунт</button>
                            <button className = {classes.login__next} onClick = {() => handleClick(true)}>Далее</button>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition in = {isMailWritten === true} timeout = {300} unmountOnExit
                    classNames = {{
                        enter:classes.animation__enter,
                        enterActive:classes.animation__enter_active,
                        exit:classes.animation__exit,
                        exitActive:classes.animation__exit_active
                    }}
                >
                    <div className = {`${classes.login__form} ${classes.login__form_second}`}>
                        <Input classModule = {classes.login__input} placeholder = {"Введите пароль"}/>
                        <div className = {classes.login__checkbox}>
                            <CheckBox label = {"Показать пароль"}/>
                        </div>
                        
                        <div className = {classes.login__buttons}>
                            <button className = {classes.login__next} onClick = {() => handleClick(true)}>Далее</button>
                        </div>
                    </div>
                </CSSTransition> 
            </div>
        </div>
    </div>
}


export default LoginPage;