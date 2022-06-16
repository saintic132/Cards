import React, {useEffect} from 'react';
import * as Yup from "yup";
import style from "./RestorePassword.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {NavLink} from "react-router-dom";
import {CheckEmail} from "./CheckEmail/CheckEmail";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../Bll/store";
import SuperButton from "../../../Common/c2-SuperButton/SuperButton";
import {forgotPasswordTC, setErrorToProfileAC} from "../../../Bll/reducers/profile-reducer";
import Preloader from "../../../Common/Preloader/Preloader";

type FormikInputType = {
    email: string
}

export function RestorePassword() {

    const errorMessage = useSelector<AppStoreType, string | null>(store => store.profile.helpers.errorMessage)
    const disableButton = useSelector<AppStoreType, boolean>(store => store.profile.helpers.disableButton)
    const sendMessageToEmail = useSelector<AppStoreType, boolean>(store => store.profile.helpers.sendMessageToEmail)
    const loadingStatus = useSelector<AppStoreType, boolean>(store => store.profile.helpers.loadingStatus)
    const dispatch = useAppDispatch()

    const initialValues: FormikInputType = {
        email: '',
    }
    const validate = Yup.object({
        email: Yup.string().required('Required').email('must be a valid email'),
    })

    const onSubmit = (values: FormikInputType) => {
        dispatch(forgotPasswordTC(values.email))
    }

    useEffect(() => {
        return () => {
            if (errorMessage) {
                dispatch(setErrorToProfileAC(null))
            }
        }
    }, [errorMessage, dispatch])

    if (sendMessageToEmail) {
        return <CheckEmail/>
    } else if (loadingStatus) {
        return <div style={{display: "flex", alignItems: 'center', height: '100vh'}}><Preloader/></div>
    } else
        return (
            <div className={style.forgotPass__container}>
                <div className={style.forgotPass__edit_body}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validate}
                    >
                        <Form className={style.forgotPass__edit}>
                            <h2>Forgot your password?</h2>
                            <div className={style.forgotPass__form_body}>
                                <div className={style.forgotPass__edit}>
                                    <Field
                                        className={style.forgotPass__edit_input}
                                        name='email'
                                        type='text'
                                        placeholder='Email'
                                    />
                                    <ErrorMessage name="email" component="div"
                                                  className={style.forgotPass_error}/>
                                </div>
                                {
                                    !errorMessage &&
                                    <div className={style.fakeDiv}/>
                                }
                                {
                                    errorMessage &&
                                    <div className={style.forgotPass_server_error}>
                                        {errorMessage}
                                    </div>
                                }
                                <div className={style.forgotPass__text_helper}>
                                    Enter your email address and we will send you further instructions
                                </div>
                                <div className={style.forgotPass__edit_buttons}>
                                    <SuperButton
                                        className={style.forgotPass__edit_buttonForgotPass}
                                        type='submit'
                                        disabled={disableButton}
                                    >
                                        Send Instructions
                                    </SuperButton>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                    <div className={style.forgotPass_sign_up_container}>
                        <div className={style.forgotPass__sign_up_account}>
                            Did you remember your password?
                        </div>
                        <div className={style.forgotPass__sign_up}>
                            <NavLink to='/login'>Try logging in</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
}