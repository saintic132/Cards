import React from 'react';
import Profile from "./Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Login} from "../../features/f2-Login/Login";
import {ForgotPass} from "../../features/f1-forgotPassword/ForgotPass";
import {CheckEmail} from "../../features/f1-forgotPassword/CheckEmail/CheckEmail";
import Error404 from "../../../common/c2-404_Page/Error404";
import {Registration} from "../../features/f3-Register/Registration";
import {useAppSelector} from "../../../store/store";
import {SetNewPassword} from "../../features/f1-forgotPassword/SetNewPassword/SetNewPassword";

export function Main() {

    const isLoggedIn = useAppSelector(state => state.profile.helpers.isLoggedIn)

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Profile isLoginIn={isLoggedIn}/>}
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
                    path="*"
                    element={<Error404/>}
                />
                <Route
                    path="recover"
                    element={<CheckEmail/>}
                />
                <Route
                    path="set-new-password/:token"
                    element={<SetNewPassword/>}
                />
            </Routes>
        </>
    )
}