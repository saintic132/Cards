import React from 'react';
import {NavLink} from "react-router-dom";
import { logoutTC } from '../../../Bll/reducers/profile-reducer';
import { useAppDispatch } from '../../../Bll/store';
import s from './NavBar.module.css'

const NavBar = () => {

    const dispatch = useAppDispatch()

    return (
        <div className={s.nav__container}>
            <div className={s.nav__body}>
                <div className={s.nav}><NavLink to={'/recover'}>Check Email</NavLink></div>
                <div className={s.nav}><NavLink to={'/restore'}>Restore Password</NavLink></div>
                <div className={s.nav}><NavLink to={'/login'}>Login</NavLink></div>
                <div className={s.nav}><NavLink to={'/set-new-password/:token'}>New Password</NavLink></div>
                <div className={s.nav}><NavLink to={'/profile'}>Profile</NavLink></div>
                <div className={s.nav}><NavLink to={'/registration'}>registration</NavLink></div>
                <div className={s.nav}><NavLink to={'/packs'}>cards</NavLink></div>
                <div
                    className={s.nav}
                    onClick={() => dispatch(logoutTC())}
                    >Logout
                </div>
            </div>
        </div>
    );
};

export default NavBar;