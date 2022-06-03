import React, {ChangeEvent, useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import SuperButton from "../../../common/buttons/c2-SuperButton/SuperButton";
import style from './Registration.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {errorUnsamePasswordAC, registrationTC, setRegisterAC} from "../../../store/reducers/registration-reducer";
import {useNavigate} from "react-router-dom";


export const Registration = () => {

    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('')
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const [password, setPassword] = useState('')
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const [confirmPassword, setConfirmPassword] = useState('')
    const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
    }
    const navigate = useNavigate()

    const errorUnsame = useAppSelector(store => store.registration.errorUnsame)
    const register = useAppSelector(store => store.registration.registerCompleted)

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    useEffect(() => {
        let newTo: any
        if (register) {
            newTo = setTimeout(() => {
                navigate('/login')
                dispatch(setRegisterAC(false))
            }, 2500)
        }

        return () => {
            if (register) {
                clearTimeout(newTo)
            }
        }

    }, [register, dispatch, navigate])

    const onSubmit = () => {
        if (password === confirmPassword) {
            dispatch(registrationTC({email, password}))
        } else {
            dispatch(errorUnsamePasswordAC('Passwords unsame'))
        }
    }
    return (
        <div className={style.registration__container}>
            <div className={style.registration__edit_body}>

                <h1>IT-Incubator</h1>
                <h2>Sign up</h2>

                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    <Form className={style.registration__edit}>
                        <div className={style.registration__edit}>
                            <label>Email</label>
                            <Field
                                className={style.registration__edit_input}
                                name='email'
                                type='text'
                                placeholder='Enter your Email'
                                value={email}
                                onChange={onChangeEmail}
                            />
                        </div>
                        <div className={style.registration__edit}>
                            <label>Password</label>
                            <Field
                                className={style.registration__edit_input}
                                name='password'
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div className={style.registration__edit}>
                            <label>Confirm password</label>
                            <Field
                                className={style.registration__edit_input}
                                name='confirmPassword'
                                type='password'
                                placeholder='Enter password'
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                            />
                        </div>
                        <div className={style.registration__edit}>
                            <span>
                                {errorUnsame}
                            </span>
                        </div>
                        {register && <div>Register completed</div>}
                        <div className={style.registration__edit_buttons}>
                            <SuperButton
                                className={style.registration__edit_buttonCancel}
                                type='reset'
                            >
                                Cancel
                            </SuperButton>
                            <SuperButton
                                className={style.registration__edit_buttonRegistration}
                                type='submit'
                                disabled={!(email && password && confirmPassword)}
                            >
                                Register
                            </SuperButton>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};