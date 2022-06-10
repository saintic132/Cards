import React from 'react';
import style from './Nav.module.css'
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {logoutTC} from "../../../store/reducers/profile-reducer";
import cards from '../../../assets/img/nav/card.png'
import profile from '../../../assets/img/nav/user.png'
import logout from '../../../assets/img/nav/logout.png'

export const Nav = () => {

    const isLoginIn = useAppSelector(state => state.profile.helpers.isLoggedIn)
    const dispatch = useAppDispatch()

    if (isLoginIn) {
        return (
            <div className={style.nav__container}>
                <div className={style.nav__body}>
                    <NavLink
                        to='/packs'
                        className={({isActive}) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <div className={style.nav__activeNav}>
                            <img src={cards} alt="cards img"/>
                            Packs list
                        </div>
                    </NavLink>
                    <NavLink
                        to='/'
                        className={({isActive}) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <div className={style.nav__activeNav}>
                            <img src={profile} alt="profile img"/>
                            Profile
                        </div>
                    </NavLink>
                </div>
                <img
                    className={style.nav__login_logout}
                    src={logout}
                    alt="logout"
                    onClick={() => dispatch(logoutTC())}
                    title='Logout'
                />
            </div>
        )
    }

    return (
        <div className={style.nav__container__notLoginIn}>
                <NavLink
                    to='/'
                >Login page</NavLink>
        </div>
    )
}