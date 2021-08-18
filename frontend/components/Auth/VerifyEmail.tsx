import React, { useRef, useState } from "react";
import BlueButton from "../Buttons/BlueButton/BlueButton";
import LinkButton from "../Buttons/LinkButton/LinkButton";
import Input from "../Formik/Input";
import GoogleIcon from "../svg/GoogleIcon";
import VerifyAccountIcon from "../svg/VerifyAccountIcon";
import classes from "./VerifyEmail.module.scss"
import { CSSTransition } from "react-transition-group"
import Router, { useRouter } from "next/router"
import ProgressBar from "../ProgressBar/ProgressBar";
import * as Yup from 'yup';
import { Field, Form, Formik } from "formik";
import authReducer from "../../store/authReducer";
import WithAuth from "../HOC/withAuth";
import globalHistoryReducer from "../../store/globalHistoryReducer";


const VerifyEmail = () => {
    const [startAnimation, setStartAnimation] = useState(true);
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const linkButtonHandler = () => {
        setLoading(true)
        setStartAnimation(false);
    }

    const submit = async (values, { setSubmitting }) => {
        const response = await authReducer.confirmMail(values.code,router.query.id as string)

        if(response.message === "success") {
            Router.push("/login")
        } else {
            alert("Что-то пошло не так!")
        }
        setSubmitting(false)
    }
    return <div className={classes.verify}>
        {isLoading && <ProgressBar classModule={classes.verify__progress} />}
        <div className={classes.verify__container}>
            {isLoading && <div className={classes.verify__loading}></div>}
            <div className={classes.verify__content}>
                <div className={classes.verify__top}>
                    <GoogleIcon classModule={classes.icon__google} />
                    <span className={classes.verify__title}>Подтвердите адрес электронной почты</span>
                    <span className={classes.verify__subTitle}>Введите код подтверждения, отправленный на адрес {router.query.email}. Если письма нет во входящих, проверьте папку "Спам".</span>
                </div>
                <CSSTransition in={startAnimation}
                    appear  ={globalHistoryReducer.history[globalHistoryReducer.history.length - 2] === "register"}
                    timeout={300}
                    classNames={{
                        appear: classes.animation__appear,
                        appearActive: classes.animation__appear_active,
                        exit: classes.animation__exit,
                        exitActive: classes.animation__exit_active,
                    }}
                    onExited = {() => {
                        if(!startAnimation) {
                            setLoading(false)
                            Router.push("/register")
                        }
                    }}
                    unmountOnExit
                >
                    <div className={classes.form}>
                        <Formik
                            initialValues = {{
                                code:""
                            }}
                            onSubmit = {submit}
                            validationSchema = {verifySchema}
                        >
                            {({values,isSubmitting,errors,touched}) => (
                                <Form>
                                    <Field component = {Input}
                                        classModule={classes.form__input} placeholder={"Введите код"}
                                        name = {"code"}
                                        isError = {Boolean(errors.code) && touched.code}
                                        helpText = {errors.code}
                                    />
                                    <div className={classes.form__buttons}>
                                        <LinkButton onClick={linkButtonHandler} label={"Назад"} />
                                        <BlueButton disabled = {isSubmitting} type = {"submit"} label={"Подтвердить"} />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </CSSTransition>
            </div>
            <div className={classes.verify__right}>
                <div className={classes.icon__verify}>
                    <VerifyAccountIcon />
                </div>
            </div>
        </div>
    </div>
}

const verifySchema = Yup.object().shape({
    code: Yup.string().required("Введите код с почты")
})


export default WithAuth(VerifyEmail);
