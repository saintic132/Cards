import React, {useEffect} from 'react';
import * as Yup from "yup";
import style from "./ForgotPass.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {NavLink} from "react-router-dom";
import SuperButton from "../../../common/buttons/c2-SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {forgotPasswordTC, setErrorToProfileAC} from "../../../store/reducers/profile-reducer";
import {CheckEmail} from "./CheckEmail/CheckEmail";

type FormikInputType = {
    email: string
}

export function ForgotPass() {

    const register = useAppSelector(store => store.profile)
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
            if (register.helpers.errorMessage) {
                dispatch(setErrorToProfileAC(null))
            }
        }
    }, [register.helpers.errorMessage, dispatch])

    if (register.helpers.sendMessageToEmail) {
        return <CheckEmail/>
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
                                    disabled={register.helpers.disableButton}
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