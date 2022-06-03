import React from 'react';
import Profile from "./Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Login} from "../../features/f2-Login/Login";
import {ForgotPass} from "../../features/f1-forgotPassword/ForgotPass";
import {EnterNewPass} from "../../features/f1-forgotPassword/EnterNewPass/EnterNewPass";
import Error404 from "../../../common/c2-404_Page/Error404";
import {Registration} from "../../features/f3-Register/Registration";
import {useAppSelector} from "../../../store/store";

export function Main() {

    const isLoginIn = useAppSelector(state => state.profile.isLoggedIn)

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Profile isLoginIn={isLoginIn}/>}
                />
                <Route
                    path="login"
                    element={<Login/>}
                />
                <Route
                    path='register'
                    element={<Registration/>}
                />
                <Route
                    path="forgot"
                    element={<ForgotPass/>}
                />
                <Route
                    path="enterNewPass"
                    element={<EnterNewPass/>}
                />
                <Route
                    path="*"
                    element={<Error404/>}
                />
            </Routes>
        </>
    )
}