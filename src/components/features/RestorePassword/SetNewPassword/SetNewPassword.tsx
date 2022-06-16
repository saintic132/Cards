import React, {useState} from 'react';
import style from './SetNewPassword.module.css'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import show_pass from "../../../../Common/img/show_hide_password/show.png";
import hidden_pass from "../../../../Common/img/show_hide_password/hidden.png";
import {useParams} from "react-router-dom";
import {CompletedNewPassword} from "./CompletedNewPassword/CompletedNewPassword";
import {AppStoreType, useAppDispatch} from "../../../../Bll/store";
import {useSelector} from "react-redux";
import {sendNewPasswordTC} from "../../../../Bll/reducers/profile-reducer";
import SuperButton from "../../../../Common/c2-SuperButton/SuperButton";
import Preloader from "../../../../Common/Preloader/Preloader";

type FormikInputType = {
    password: string
}

export const SetNewPassword = () => {

    const [showPass, setShowPass] = useState<boolean>(false)
    const errorMessage = useSelector<AppStoreType, string | null>(store => store.profile.helpers.errorMessage)
    const disableButton = useSelector<AppStoreType, boolean>(store => store.profile.helpers.disableButton)
    const newPassSet = useSelector<AppStoreType, boolean>(store => store.profile.helpers.newPassSet)
    const loadingStatus = useSelector<AppStoreType, boolean>(store => store.profile.helpers.loadingStatus)

    const dispatch = useAppDispatch()
    const {token} = useParams<'token'>()

    const initialValues = {
        password: ''
    }

    const validate = Yup.object({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Too short - should be 8 chars minimum.')
    })

    const onSubmit = (values: FormikInputType) => {
        if (token)
            dispatch(sendNewPasswordTC(values.password, token))
    }

    if (newPassSet) {
        return <CompletedNewPassword/>
    } else if (loadingStatus) {
        return <div style={{display: "flex", alignItems: 'center', height: '100vh'}}><Preloader/></div>
    } else
        return (
            <div className={style.newPass__container}>
                <div className={style.newPass__edit_body}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validate}
                        onSubmit={onSubmit}
                    >
                        <Form className={style.newPass__edit}>
                            <h2>Create new password</h2>
                            <div className={style.newPass__form_body}>
                                <div className={style.newPass__edit}>
                                    <Field
                                        className={style.newPass__edit_input}
                                        name='password'
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='Enter the password'
                                    />
                                    <img
                                        className={style.newPass__show_hide_pass}
                                        src={showPass ? show_pass : hidden_pass}
                                        onClick={() => setShowPass(!showPass)}
                                        alt="show or hide"/>
                                    <ErrorMessage name="password" component="div"
                                                  className={style.newPass_error}/>
                                </div>
                                {
                                    !errorMessage &&
                                    <div className={style.fakeDiv}/>
                                }
                                {
                                    errorMessage &&
                                    <div className={style.newPass_server_error}>
                                        {errorMessage}
                                    </div>
                                }
                                <div className={style.newPass__text_helper}>
                                    Create new password and we will send you further instructions to email
                                </div>
                                <div className={style.newPass__edit_button}>
                                    <SuperButton
                                        className={style.newPass__edit_buttonSubmit}
                                        type='submit'
                                        disabled={disableButton}
                                    >
                                        Create new password
                                    </SuperButton>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        )
}