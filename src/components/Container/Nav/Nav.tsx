import React from 'react';
import style from './Nav.module.css'
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {logoutTC} from "../../../store/reducers/profile-reducer";

export const Nav = () => {

    const isLoginIn = useAppSelector(state => state.profile.helpers.isLoggedIn)
    const dispatch = useAppDispatch()

    if (isLoginIn) {
        return (
            <div className={style.nav__container}>
                <div className={style.nav__body}>
                    <div className={style.nav__center}>
                        <NavLink to={'cards'}>Packs List</NavLink>
                        <NavLink to={'/'}>Profile</NavLink>
                    </div>
                    <div className={style.nav__login_logout}
                         onClick={() => dispatch(logoutTC())}
                    >
                        Logout
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={style.nav__container__notLoginIn}>
            <NavLink to={'/'}>Main page</NavLink>
        </div>
    )
}