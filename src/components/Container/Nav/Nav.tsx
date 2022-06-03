import React from 'react';
import style from './Nav.module.css'
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../store/store";
import {setEditProfileAC} from "../../../store/reducers/profile-reducer";

export const Nav = () => {

    const dispatch = useAppDispatch()

    const clickToGoingMainProfile = () => {
        dispatch(setEditProfileAC(false))
    }

    return (
        <div className={style.container}>
            <NavLink to={'/'} onClick={clickToGoingMainProfile}>Profile</NavLink>
            <NavLink to={'login'}>Login</NavLink>
            <NavLink to={'registration'}>Registration</NavLink>
            <NavLink to={'forgotPass'}>ForgotPass</NavLink>
            <NavLink to={'enterNewPass'}>EnterNewPass</NavLink>
        </div>
    )
}