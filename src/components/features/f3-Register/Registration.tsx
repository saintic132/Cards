import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import SuperButton from "../../../common/c4-common_buttons/c2-SuperButton/SuperButton";
import style from './Registration.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useNavigate} from "react-router-dom";
import {
    registrNewUserTC,
    setErrorToProfileAC,
    setRegistrationCompletedAC
} from "../../../store/reducers/profile-reducer";
import * as Yup from "yup";
import show_pass from '../../../assets/a2-show_hide_password/show.png'
import hidden_pass from '../../../assets/a2-show_hide_password/hidden.png'

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
    const register = useAppSelector(store => store.profile)

    useEffect(() => {
        let newTo: number
        if (register.helpers.registerCompleted) {
            newTo = +setTimeout(() => {
                navigate('/login')
                dispatch(setRegistrationCompletedAC(false))
            }, 3000)
        }

        return () => {
            if (register.helpers.registerCompleted) {
                clearTimeout(newTo)
            }  else if (register.helpers.errorMessage) {
                dispatch(setErrorToProfileAC(null))
            }
        }

    }, [register.helpers.registerCompleted, register.helpers.errorMessage, dispatch, navigate])

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
        dispatch(registrNewUserTC(values.email, values.password))
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
                                !register.helpers.errorMessage &&
                                <div className={style.fakeDiv}/>
                            }
                            {
                                register.helpers.errorMessage &&
                                <div className={style.registration_server_error}>
                                    {register.helpers.errorMessage}
                                </div>
                            }
                            {register.helpers.registerCompleted && <div>Register completed</div>}
                            <div className={style.registration__edit_buttons}>
                                <SuperButton
                                    className={style.registration__edit_buttonCancel}
                                    type='reset'
                                    onClick={hideAllPasswordWhenReset}
                                    disabled={register.helpers.disableButton}
                                >
                                    Cancel
                                </SuperButton>
                                <SuperButton
                                    className={style.registration__edit_buttonRegistration}
                                    type='submit'
                                    disabled={register.helpers.disableButton}
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