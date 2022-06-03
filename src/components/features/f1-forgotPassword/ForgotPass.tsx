import React, {useEffect} from 'react';
import * as Yup from "yup";
import style from "./ForgotPass.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {NavLink, useNavigate} from "react-router-dom";
import SuperButton from "../../../common/c4-common_buttons/c2-SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {setNewPasswordAC} from "../../../store/reducers/profile-reducer";

type FormikInputType = {
    email: string
}

export function ForgotPass() {

    const register = useAppSelector(store => store.profile)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (register.helpers.sendMessageToEmail) {
                navigate('/recover')
        }
    }, [register.helpers.sendMessageToEmail, dispatch, navigate])

    const initialValues: FormikInputType = {
        email: '',
    }
    const validate = Yup.object({
        email: Yup.string().email('must be a valid email'),
    })

    const onSubmit = (values: FormikInputType) => {
        // dispatch(forgotPasswordTC(values.email))
        dispatch(setNewPasswordAC(true))
    }

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
                                !register.helpers.errorMessage &&
                                <div className={style.fakeDiv}/>
                            }
                            {
                                register.helpers.errorMessage &&
                                <div className={style.forgotPass_server_error}>
                                    {register.helpers.errorMessage}
                                </div>
                            }
                            <div className={style.forgotPass__text_helper}>
                                Enter your email address and we will send you further instructions
                            </div>
                            <div className={style.forgotPass__edit_buttons}>
                                <SuperButton
                                    className={style.forgotPass__edit_buttonForgotPass}
                                    type='submit'
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