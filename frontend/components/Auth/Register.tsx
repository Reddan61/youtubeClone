import React, { useState } from 'react'
import BlueButton from '../Buttons/BlueButton/BlueButton';
import LinkButton from '../Buttons/LinkButton/LinkButton';
import CheckBox from '../Formik/CheckBox';
import Input from '../Formik/Input';
import AccountIcon from '../svg/AccountIcon';
import GoogleIcon from '../svg/GoogleIcon';
import classes from "./Register.module.scss"
import Router from "next/router"
import {CSSTransition} from 'react-transition-group'
import ProgressBar from '../ProgressBar/ProgressBar';
import globalHistoryReducer from '../../store/globalHistoryReducer';

const Register = () => {

    const [startExitAnimation,setStartExitAnimation] = useState(true)
    const [isLoading,setLoading] = useState(false)

    const submit = () => {
        setLoading(true)
        setTimeout(() => {
            setStartExitAnimation(false)
            setLoading(false)
    

        },1000)
        
    }
    return <div className = {classes.register}>
        {isLoading && <ProgressBar classModule = {classes.register__progress}/>}
        <div className = {classes.register__container}>
            {isLoading && <div className = {classes.register__loading}></div>}
            <div className = {classes.register__content}>
                <div className = {classes.register__top}>
                    <GoogleIcon classModule = {classes.icon__google}/>
                    <span className = {classes.register__title}>Создайте аккаунт Google</span>
                    <span className = {classes.register__subTitle}>Перейдите на YouTube</span>
                </div>
                <CSSTransition
                    in = {startExitAnimation}
                    timeout = {300}
                    appear  ={globalHistoryReducer.history[globalHistoryReducer.history.length - 2] === "verifyemail"}
                    classNames = {{
                        appear:classes.animation__appear,
                        appearActive:classes.animation__appear_active,
                        exit:classes.animation__exit,
                        exitActive:classes.animation__exit_active
                    }}
                    onExited = {() => {
                        Router.push('/verifyemail')
                    }}
                    unmountOnExit
                >
                    <div className = {classes.form}>
                        <div className = {classes.form__content}>
                            <Input classModule = {`${classes.register__input} ${classes.input__name}`} placeholder = {"Имя"}/>
                            <Input classModule = {`${classes.register__input} ${classes.input__secondName}`} placeholder = {"Фамилия"}/>
                            <Input classModule = {`${classes.register__input} ${classes.input__email}`} placeholder = {"Адрес электронной почты"}/>
                            <span className = {`${classes.register__text} ${classes.register__text_email}`}>Вам нужно будет подтвердить, что это ваш адрес электронной почты</span>
                            <Input classModule = {`${classes.register__input} ${classes.input__password}`} placeholder = {"Пароль"}/>
                            <Input classModule = {`${classes.register__input} ${classes.input__passwordSub}`} placeholder = {"Подтвердить"}/>
                            <span className = {`${classes.register__text} ${classes.register__text_password}`}>Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы</span>
                            <CheckBox classModule = {classes.register__checkbox} label = {"Показать пароль"} />
                        </div>
                        <div className = {classes.form__buttons}>
                            <LinkButton onClick = {() => Router.push('/login')} label = {"Войти"}/>
                            <BlueButton label = {"Далее"} onClick = {() => submit()}/>
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <div className = {classes.register__right}>
                <AccountIcon classModule = {classes.icon__account}/>
                <span className = {classes.register__singleAcc}>Один аккаунт – для всех сервисов Google</span>
            </div>
            
        </div>
    </div>
}

export default Register;