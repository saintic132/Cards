import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import style from './CompletedNewPassword.module.css'
import ok from '../../../../../Common/img/email_send/ok.png'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../../Bll/store";
import {setNewPasswordAC} from "../../../../../Bll/reducers/profile-reducer";

export const CompletedNewPassword = () => {

    const newPassSet = useSelector<AppStoreType, boolean>(store => store.profile.helpers.newPassSet)
    const [count, setCount] = useState<number>(5);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        let newTo: number
        if (newPassSet) {
            newTo = +setTimeout(() => {
                navigate('/login')
                dispatch(setNewPasswordAC(false))
            }, 5000)
        }

        return () => {
            if (newPassSet) {
                clearTimeout(newTo)
                dispatch(setNewPasswordAC(false))
            }
        }

    }, [newPassSet, dispatch, navigate])

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