import React from 'react'
import CheckBox from '../Formik/CheckBox';
import Input from '../Formik/Input';
import AccountIcon from '../svg/AccountIcon';
import GoogleIcon from '../svg/GoogleIcon';
import classes from "./Register.module.scss"


const Register = () => {
    return <div className = {classes.register}>
        <div className = {classes.register__container}>
            <div className = {classes.register__content}>
                <div className = {classes.register__top}>
                    <GoogleIcon classModule = {classes.icon__google}/>
                    <span className = {classes.register__title}>Создайте аккаунт Google</span>
                    <span className = {classes.register__subTitle}>Перейдите на YouTube</span>
                </div>
                <div className = {classes.register__form}>
                    <Input classModule = {classes.register__input} placeholder = {"Имя"}/>
                    <Input classModule = {classes.register__input} placeholder = {"Фамилия"}/>
                    <Input classModule = {classes.register__input} width = {"352px"} height = {"34px"} placeholder = {"Адрес электронной почты"}/>
                    <span>Вам нужно будет подтвердить, что жто ваш адрес электронной почты</span>
                    <Input classModule = {classes.register__input} placeholder = {"Пароль"}/>
                    <Input classModule = {classes.register__input} placeholder = {"Подтвердить"}/>
                    <span>Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы</span>
                    <CheckBox label = {"Показать пароль"} />
                </div>
            </div>
            <div className = {classes.register__right}>
                <AccountIcon classModule = {classes.icon__acount}/>
                <span className = {classes.register__singleAcc}>Один аккаунт – для всех сервисов Google</span>
            </div>
            
        </div>
    </div>
}

export default Register;