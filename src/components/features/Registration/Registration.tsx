import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import style from './Registration.module.css';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import show_pass from '../../../Common/img/show_hide_password/show.png'
import hidden_pass from '../../../Common/img/show_hide_password/hidden.png'
import {AppStoreType, useAppDispatch} from "../../../Bll/store";
import {
    registrationNewUserTC,
    setErrorToProfileAC,
    setRegistrationCompletedAC
} from "../../../Bll/reducers/profile-reducer";
import SuperButton from '../../../Common/c2-SuperButton/SuperButton';
import {useSelector} from "react-redux";
import Preloader from "../../../Common/Preloader/Preloader";

type FormikInputType = {
    email: string,
    password: string,
    passwordConfirm: string,
}

export const Registration = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const registrationCompleted = useSelector<AppStoreType, boolean>(state => state.profile.helpers.registerCompleted)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.profile.helpers.errorMessage)
    const disableButton = useSelector<AppStoreType, boolean>(state => state.profile.helpers.disableButton)
    const loadingStatus = useSelector<AppStoreType, boolean>(store => store.profile.helpers.loadingStatus)


    useEffect(() => {
        let newTo: number
        if (registrationCompleted) {
            newTo = +setTimeout(() => {
                navigate('/login')
                dispatch(setRegistrationCompletedAC(false))
            }, 3000)
        }

        return () => {
            if (registrationCompleted) {
                clearTimeout(newTo)
            } else if (errorMessage) {
                dispatch(setErrorToProfileAC(null))
            }
        }

    }, [registrationCompleted, errorMessage, dispatch, navigate])

    const hideAllPasswordWhenReset = () => {
        setShowPass(false)
        setShowConfirmPass(false)
        navigate('/login')
    }

    const initialValues: FormikInputType = {
        email: '',
        password: '',
        passwordConfirm: '',
    }
    const validate = Yup.object({
        email: Yup.string().required('Required').email('must be a valid email'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Too short - should be 8 chars minimum.')
            .oneOf([Yup.ref('passwordConfirm'), null], 'Passwords must match')
        ,
        passwordConfirm: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const onSubmit = (values: FormikInputType) => {
        dispatch(registrationNewUserTC({email: values.email, password: values.password}))
    }

    if (loadingStatus) {
        return <div style={{display: "flex", alignItems: 'center', height: '100vh'}}>
            <Preloader/>
        </div>
    }

    return (
        <div className={style.registration__container}>
            <div className={style.registration__edit_body}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={onSubmit}
                >
                    <Form className={style.registration__edit}>
                        <h2>Sign up</h2>
                        <div className={style.registration__form_body}>
                            <div className={style.registration__edit}>
                                <label>Email</label>
                                <Field
                                    className={style.registration__edit_input}
                                    name='email'
                                    type='text'
                                    placeholder='Enter your Email'
                                />
                                <ErrorMessage name="email" component="div"
                                              className={style.registration_error}/>
                            </div>
                            <div className={style.registration__edit}>
                                <label>Password</label>
                                <Field
                                    className={style.registration__edit_input}
                                    name='password'
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='Enter the password'
                                />
                                <img
                                    className={style.registration__show_hide_pass}
                                    src={showPass ? show_pass : hidden_pass}
                                    onClick={() => setShowPass(!showPass)}
                                    alt="show or hide"/>
                                <ErrorMessage name="password" component="div"
                                              className={style.registration_error}/>
                            </div>
                            <div className={style.registration__edit}>
                                <label>Confirm password</label>
                                <Field
                                    className={style.registration__edit_input}
                                    name='passwordConfirm'
                                    type={showConfirmPass ? 'text' : 'password'}
                                    placeholder='Confirm the password'
                                />
                                <img
                                    className={style.registration__show_hide_pass}
                                    src={showConfirmPass ? show_pass : hidden_pass}
                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                    alt="show or hide"/>
                                <ErrorMessage name="passwordConfirm" component="div"
                                              className={style.registration_error}/>
                            </div>
                            {
                                !errorMessage &&
                                <div className={style.fakeDiv}/>
                            }
                            {
                                errorMessage &&
                                <div className={style.registration_server_error}>
                                    {errorMessage}
                                </div>
                            }
                            {errorMessage && <div>Register completed</div>}
                            <div className={style.registration__edit_buttons}>
                                <SuperButton
                                    className={style.registration__edit_buttonCancel}
                                    type='reset'
                                    onClick={hideAllPasswordWhenReset}
                                    disabled={disableButton}
                                >
                                    Cancel
                                </SuperButton>
                                <SuperButton
                                    className={style.registration__edit_buttonRegistration}
                                    type='submit'
                                    disabled={disableButton}
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