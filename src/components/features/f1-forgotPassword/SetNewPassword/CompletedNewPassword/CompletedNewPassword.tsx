import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../store/store";
import {setNewPasswordAC} from "../../../../../store/reducers/profile-reducer";
import {NavLink, useNavigate} from "react-router-dom";
import style from './CompletedNewPassword.module.css'
import ok from '../../../../../assets/a3-email_send/ok.png'

export const CompletedNewPassword = () => {

    const newPass = useAppSelector(store => store.profile.helpers.newPassSet)
    const [count, setCount] = useState<number>(5);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        let newTo: number
        if (newPass) {
            newTo = +setTimeout(() => {
                navigate('/login')
                dispatch(setNewPasswordAC(false))
            }, 5000)
        }

        return () => {
            if (newPass) {
                clearTimeout(newTo)
                dispatch(setNewPasswordAC(false))
            }
        }

    }, [newPass, dispatch, navigate])

    useEffect(() => {
        let newInterval: number
        newInterval = +setInterval(() => {
            setCount(prevState => prevState - 1)
        }, 1000)

        return () => {
                clearInterval(newInterval)
        }
    }, [count])

    return (
        <div className={style.newPasswords_set__container}>
            <div className={style.newPasswords_set__body}>
                <img src={ok} alt=""/>
                <div className={style.newPasswords__navigate_text}>
                    Redirecting to <NavLink to='/login'>Login Page</NavLink>
                </div>
                <div className={style.newPasswords__timer_text}>
                    in <span className={style.newPasswords__timer}>...{count}</span>
                </div>
            </div>
        </div>
    )
}