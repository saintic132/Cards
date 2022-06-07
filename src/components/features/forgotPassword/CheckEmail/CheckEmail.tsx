import React, {useEffect} from 'react';
import style from './CheckEmail.module.css'
import email_img from '../../../../assets/img/email_send/email.png'
import {sendEmailToRecoverPasswordAC} from "../../../../store/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/store";

export function CheckEmail() {

    const register = useAppSelector(store => store.profile)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            if (register.helpers.sendMessageToEmail) {
                dispatch(sendEmailToRecoverPasswordAC(false, null))
            }
        }
    }, [register.helpers.sendMessageToEmail, dispatch])

    return (
        <div className={style.checkEmail__container}>
            <img src={email_img} alt="email-send"/>
            <div className={style.checkEmail__text}>
                Check Email
            </div>
            <div className={style.checkEmail__send}>
                We’ve sent an Email with instructions to {register.helpers.tempEmailToRecover}
            </div>
        </div>
    )
}