import React, {useState} from 'react';
import style from './SetNewPassword.module.css'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import show_pass from "../../../../assets/a2-show_hide_password/show.png";
import hidden_pass from "../../../../assets/a2-show_hide_password/hidden.png";
import SuperButton from "../../../../common/c4-common_buttons/c2-SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {useParams} from "react-router-dom";
import {sendNewPasswordTC} from "../../../../store/reducers/profile-reducer";
import {CompletedNewPassword} from "./CompletedNewPassword/CompletedNewPassword";

type FormikInputType = {
    password: string
}

export const SetNewPassword = () => {

    const [showPass, setShowPass] = useState<boolean>(false)
    const forgot = useAppSelector(store => store.profile.helpers)
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

    if (forgot.newPassSet) {
        return <CompletedNewPassword
        />
    }

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
                                !forgot.errorMessage &&
                                <div className={style.fakeDiv}/>
                            }
                            {
                                forgot.errorMessage &&
                                <div className={style.newPass_server_error}>
                                    {forgot.errorMessage}
                                </div>
                            }
                            <div className={style.newPass__text_helper}>
                                Create new password and we will send you further instructions to email
                            </div>
                            <div className={style.newPass__edit_button}>
                                <SuperButton
                                    className={style.newPass__edit_buttonSubmit}
                                    type='submit'
                                    disabled={forgot.disableButton}
                                >
                                    Register
                                </SuperButton>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}