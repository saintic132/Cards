import style from './Login.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import show_pass from "../../../Common/img/show_hide_password/show.png";
import hidden_pass from "../../../Common/img/show_hide_password/hidden.png";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../Bll/store";
import SuperButton from '../../../Common/c2-SuperButton/SuperButton';
import {loginTC, setErrorToProfileAC} from "../../../Bll/reducers/profile-reducer";
import Preloader from "../../../Common/Preloader/Preloader";


type FormikInputType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.profile.helpers.isLoggedIn)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.profile.helpers.errorMessage)
    const disableButton = useSelector<AppStoreType, boolean>(state => state.profile.helpers.disableButton)
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.profile.helpers.loadingStatus)
    const [showPass, setShowPass] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }

        return () => {
            if (errorMessage) {
                dispatch(setErrorToProfileAC(null))
            }
        }
    }, [isLoggedIn, errorMessage, dispatch, navigate])

    const initialValues: FormikInputType = {
        email: '',
        password: '',
        rememberMe: false
    }
    const validate = Yup.object({
        email: Yup.string().required('Required').email('must be a valid email'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Too short - should be 8 chars minimum.')
    })

    const onSubmit = (values: FormikInputType) => {
        dispatch(loginTC({email: values.email, password: values.password, rememberMe: values.rememberMe}))
    }

    if (loadingStatus) {
        return <div style={{display: "flex", alignItems: 'center', height: '100vh'}}><Preloader /></div>
    }

    return (
        <div className={style.login__container}>
            <div className={style.login__edit_body}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validate}
                >
                    <Form className={style.login__edit}>
                        <h2>Sign in</h2>
                        <div className={style.login__form_body}>
                            <div className={style.login__edit}>
                                <label>Email</label>
                                <Field
                                    className={style.login__edit_input}
                                    name='email'
                                    type='text'
                                    placeholder='Enter your Email'
                                />
                                <ErrorMessage name="email" component="div"
                                              className={style.login_error}/>
                            </div>
                            <div className={style.login__edit}>
                                <label>Password</label>
                                <Field
                                    className={style.login__edit_input}
                                    name='password'
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='Enter the password'
                                />
                                <img
                                    className={style.login__show_hide_pass}
                                    src={showPass ? show_pass : hidden_pass}
                                    onClick={() => setShowPass(!showPass)}
                                    alt="show or hide"/>
                                <ErrorMessage name="password" component="div"
                                              className={style.login_error}/>
                            </div>
                            <div className={style.login__edit_checkbox_container}>
                                Remember Me
                                <Field
                                    className={style.login__edit_checkbox}
                                    name='rememberMe'
                                    type='checkbox'
                                />
                            </div>
                            {
                                !errorMessage &&
                                <div className={style.fakeDiv}/>
                            }
                            {
                                errorMessage &&
                                <div className={style.login_server_error}>
                                    {errorMessage}
                                </div>
                            }
                            <div className={style.login__forgotPass}>
                                <NavLink to='/forgot'>Forgot password</NavLink>
                            </div>
                            <div className={style.login__edit_buttons}>
                                <SuperButton
                                    className={style.login__edit_buttonLogin}
                                    type='submit'
                                    disabled={disableButton}
                                >
                                    Login
                                </SuperButton>
                            </div>
                        </div>
                    </Form>
                </Formik>
                <div className={style.login_sign_up_container}>
                    <div className={style.login__sign_up_account}>
                        Don't have an account?
                    </div>
                    <div className={style.login__sign_up}>
                        <NavLink to='/registration'>Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
};