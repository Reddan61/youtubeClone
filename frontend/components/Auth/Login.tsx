import React, { useState } from "react"
import Input from "../Formik/Input";
import classes from "./Login.module.scss"
import {CSSTransition} from "react-transition-group"
import UserAvatarIcon from "../svg/UserAvatarIcon";
import ArrowDownIcon from "../svg/ArrowDownIcon";
import Router, { useRouter } from "next/router"
import GoogleIcon from "../svg/GoogleIcon";
import BlueButton from "../Buttons/BlueButton/BlueButton";
import LinkButton from "../Buttons/LinkButton/LinkButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Field, Form, Formik } from "formik";
import * as yup from 'yup';
import authReducer from "../../store/authReducer";
import { observer } from "mobx-react-lite";
import CheckBox from "../Formik/CheckBox";
import WithAuth from "../HOC/withAuth";

const LoginPage = () => {
    const [isLoading,setLoading] = useState(false)
    const [email,setEmail] = useState<null | string>(null)
    
    const handleClick = (bool:boolean) => {
        setLoading(true)
        setEmail(null)
    }

    return <div className = {classes.login}>
        {isLoading && <ProgressBar />}
        <div className = {classes.login__container}>
            {isLoading && <div className = {classes.login__loading}></div>}
            <div className = {classes.login__top}>
                {email ? 
                    <>
                        <GoogleIcon classModule = {classes.icon__google}/>
                        <h1>Добро пожаловать!</h1>
                        <div className = {classes.login__email} onClick = {() => handleClick(false)}>
                            <UserAvatarIcon classModule = {classes.icon__avatar}/>
                            <span>{email}</span>
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
                <CSSTransition in = {email === null} timeout = {300} unmountOnExit
                    classNames = {{
                        enter:classes.animation__enter,
                        enterActive:classes.animation__enter_active,
                        exit:classes.animation__exit,
                        exitActive:classes.animation__exit_active
                    }}
                    onExit = {() => {
                        setLoading(false)
                    }}
                >
                    <div className = {classes.login__form}>
                        <FirstForm setLoading = {setLoading} setEmail = {setEmail} />
                    </div>
                </CSSTransition>
                <CSSTransition in = {email !== null} timeout = {300} unmountOnExit
                    classNames = {{
                        enter:classes.animation__enter,
                        enterActive:classes.animation__enter_active,
                        exit:classes.animation__exit,
                        exitActive:classes.animation__exit_active
                    }}
                    onExit = {() => {
                        setLoading(false)
                    }}
                >
                    <div className = {`${classes.login__form} ${classes.login__form_second}`}>
                        <SecondForm setLoading = {setLoading} email = {email}/>
                    </div>
                </CSSTransition> 
            </div>
        </div>
    </div>
}

interface IFormsProps {
    setLoading: (bool:boolean) => void
}

const FirstForm:React.FC<IFormsProps & {setEmail:(value:null | string) => void}> = ({setLoading, setEmail}) => {
    const submit = async (values, {setSubmitting}) => {
        setLoading(true)
        const response = await authReducer.checkEmail(values.email)  
        if(response.message === "success") {
            setEmail(response.payload.email)
        } else {
            alert("Что-то пошло не так!")
            setEmail(null)
        }
        setLoading(false)
        setSubmitting(false)
    }

    return <>
        <Formik
            initialValues={{ email: '' }}
            onSubmit={submit}
            validationSchema={firstFormSchema}
        >
            {({ values, errors, isSubmitting, touched }) => (
                <Form>                 
                    <Field classModule = {classes.login__input} 
                        name = {"email"} component = {Input} 
                        placeholder = {"Адрес эл.почты"}
                        isError = {Boolean(errors.email) && touched.email}
                        helpText = {errors.email}
                    />
                    {/* <Input classModule = {classes.login__input} placeholder = {"Адрес эл.почты"}/> */}
                    <div className = {classes.login__buttons}>
                        <LinkButton onClick = {() => Router.push("/register")} label = {"Создать аккаунт"}/>
                        <BlueButton disabled = {isSubmitting} type = {"submit"} label = {"Далее"}/>
                    </div>
                </Form>
            )}
        </Formik>
    </>
}

const SecondForm:React.FC<IFormsProps & {email:string}> = ({setLoading, email}) => {

    const submit = async (values, {setSubmitting}) => {
        setLoading(true)

        const response = await authReducer.login(email,values.password)
        if(response.message !== "success") {
            alert("Что-то пошло не так!")
        }
        setLoading(false)

        setSubmitting(false)
    }

    return <>
        <Formik
            initialValues={{ password: '', showPassword:false }}
            onSubmit={submit}
            validationSchema={secondFormSchema}
        >
            {({ values, errors, isSubmitting, touched }) => (
                <Form>               
                    <Field classModule = {classes.login__input} 
                        name = {"password"} component = {Input} 
                        placeholder = {"Введите пароль"}
                        isError = {Boolean(errors.password) && touched.password}
                        helpText = {errors.password}
                        type = {values.showPassword ? "text" :"password"}
                    />
                    <div className = {classes.login__checkbox}>
                        <Field name = {"showPassword"} label = {"Показать пароль"} component = {CheckBox}/>
                    </div>
                    
                    <div className = {classes.login__buttons}>
                        <BlueButton disabled = {isSubmitting} label = {"Далее"} type = {"submit"}/>
                    </div> 
                </Form>
            )}
        </Formik>
    </>
}

const firstFormSchema = yup.object().shape({
    email: yup.string().email("Неправильный формат").required("Введите адрес электронной почты")
})

const secondFormSchema = yup.object().shape({
    password: yup.string().min(5,"Минимум 5 символов").required("Введите пароль")
})

export default WithAuth(LoginPage)