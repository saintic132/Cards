import React from 'react';
import style from './Nav.module.css'
import {NavLink} from "react-router-dom";

export const Nav = () => {

    return (
        <div className={style.container}>
            <NavLink to={'profile'} >Profile</NavLink>
            <NavLink to={'login'}>Login</NavLink>
            <NavLink to={'register'}>Registration</NavLink>
            <NavLink to={'newPassSet'}>EnterNewPass</NavLink>
        </div>
    )
}