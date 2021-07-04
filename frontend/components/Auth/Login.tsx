import React from "react"
import Input from "../Formik/Input";
import classes from "./Login.module.scss"

const LoginPage = () => {
    return <div className = {classes.login}>
        <div className = {classes.login__container}>
            <div className = {classes.login__top}>
                <h1>Вход</h1>
                <span>Перейдите на YouTube</span>
            </div>
            <div className = {classes.login__form}>
                <Input />
                <div className = {classes.login__buttons}>
                    <button>Создать аккаунт</button>
                    <button>Далее</button>
                </div>
            </div>
        </div>
    </div>
}


export default LoginPage;