import React, {useEffect} from 'react';
import style from './CheckEmail.module.css'
import email_img from '../../../../Common/img/email_send/email.png'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../Bll/store";
import {sendEmailToRecoverPasswordAC} from "../../../../Bll/reducers/profile-reducer";

export function CheckEmail() {

    const sendMessageToEmail = useSelector<AppStoreType, boolean>(store => store.profile.helpers.sendMessageToEmail)
    const tempEmailToRecover = useSelector<AppStoreType, string | null>(store => store.profile.helpers.tempEmailToRecover)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            if (sendMessageToEmail) {
                dispatch(sendEmailToRecoverPasswordAC(false, null))
            }
        }
    }, [sendMessageToEmail, dispatch])

    return (
        <div className={style.checkEmail__container}>
            <img src={email_img} alt="email-send"/>
            <div className={style.checkEmail__text}>
                Check Email
            </div>
            <div className={style.checkEmail__send}>
                We’ve sent an Email with instructions to {tempEmailToRecover}
            </div>
        </div>
    )
}