import React from 'react';
import style from './Nav.module.css'
import {NavLink} from "react-router-dom";

export const Nav = () => {
    return (
        <div className={style.container}>
            <NavLink to={'/'}>Profile</NavLink>
            <NavLink to={'login'}>Login</NavLink>
            <NavLink to={'forgotPass'}>ForgotPass</NavLink>
            <NavLink to={'enterNewPass'}>EnterNewPass</NavLink>
        </div>
    )
}