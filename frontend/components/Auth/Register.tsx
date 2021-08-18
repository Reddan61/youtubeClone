import React, { useRef, useState } from 'react'
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
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import authReducer from '../../store/authReducer';
import WithAuth from '../HOC/withAuth';


const Register = () => {
    const [startExitAnimation,setStartExitAnimation] = useState(true)
    const [isLoading,setLoading] = useState(false)

    const registerInfoRef = useRef<null | {id:string,email:string}>(null)

    const submit = async (values) => {
        setLoading(true)
        const response = await authReducer.registrationUser(values)
        if(response.message === "error") {
            alert("Что-то пошло не так!")
            setLoading(false)
            return
        }
        registerInfoRef.current = {
            id: response.data.payload.id,
            email:response.data.payload.email
        }
        setStartExitAnimation(false)
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
                        Router.push(`/verifyemail?email=${registerInfoRef.current.email}&id=${registerInfoRef.current.id}`)
                        setLoading(false)               
                    }}
                    unmountOnExit
                >
                    <div className = {classes.form}>
                            <Formik
                                initialValues = {{
                                    name:"",
                                    secondName:"",
                                    email:"",
                                    password:"",
                                    passwordSub:"",
                                    showPassword:false
                                }}
                                onSubmit = {submit}
                                validationSchema = {registrationSchema}
                            >
                                {({values,errors,touched,isSubmitting}) => (
                                    <Form>
                                        <div className = {classes.form__content}>
                                            <Field 
                                                classModule = {`${classes.register__input} ${classes.input__name}`} placeholder = {"Имя"}
                                                component = {Input} name = {"name"}
                                                isError = {Boolean(errors.name) && touched.name}
                                                helpText = {errors.name}
                                            />
                                            <Field 
                                                classModule = {`${classes.register__input} ${classes.input__secondName}`} placeholder = {"Фамилия"}
                                                component = {Input} name = {"secondName"}
                                                isError = {Boolean(errors.secondName) && touched.secondName}
                                                helpText = {errors.secondName}
                                            />
                                            <Field 
                                                classModule = {`${classes.register__input} ${classes.input__email}`} placeholder = {"Адрес электронной почты"}
                                                component = {Input} name = {"email"}
                                                isError = {Boolean(errors.email) && touched.email}
                                                helpText = {errors.email}
                                            />
                                            <span className = {`${classes.register__text} ${classes.register__text_email}`}>Вам нужно будет подтвердить, что это ваш адрес электронной почты</span>
                                            <Field 
                                                classModule = {`${classes.register__input} ${classes.input__password}`} placeholder = {"Пароль"}
                                                component = {Input} name = {"password"}
                                                isError = {Boolean(errors.password) && touched.password}
                                                helpText = {errors.password}
                                                type = {values.showPassword ? "text" :"password"}
                                            />
                                            <Field 
                                                classModule = {`${classes.register__input} ${classes.input__passwordSub}`} placeholder = {"Подтвердить"}
                                                component = {Input} name = {"passwordSub"}
                                                isError = {Boolean(errors.passwordSub) && touched.passwordSub}
                                                helpText = {errors.passwordSub}
                                                type = {values.showPassword ? "text" :"password"}
                                            />
                                            <span className = {`${classes.register__text} ${classes.register__text_password}`}>Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы</span>
                                            <Field 
                                                classModule = {classes.register__checkbox} label = {"Показать пароль"}
                                                component = {CheckBox} name = {"showPassword"}
                                            />
                                        </div>
                                        <div className = {classes.form__buttons}>
                                            <LinkButton onClick = {() => Router.push('/login')} label = {"Войти"}/>
                                            <BlueButton disabled = {isSubmitting} label = {"Далее"} type = {"submit"}/>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
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

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3,"Минимум 3 символа")
        .max(50, "Слишком много символов")
        .required("Обязательное поле"),
    secondName: Yup.string()
        .min(3,"Минимум 3 символа")
        .max(50, "Слишком много символов")
        .required("Обязательное поле"),
    email: Yup.string()
        .email("Неправильный формат")
        .required("Обязательное поле"),
    password: Yup.string()
        .min(5,"Минимум 5 символов")
        .max(50, "Слишком много символов")
        .required("Обязательное поле"),
    passwordSub: Yup.string()
        .oneOf([Yup.ref('password'), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
})

export default WithAuth(Register);