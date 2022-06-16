import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import Notfound from "../NotFound/Notfound";
import Profile from "../../Profile/Profile";
import PacksList from "../../PacksList/PacksList";
import {Registration} from "../Registration/Registration";
import {RestorePassword} from "../RestorePassword/RestorePassword";
import {CheckEmail} from '../RestorePassword/CheckEmail/CheckEmail';
import {SetNewPassword} from '../RestorePassword/SetNewPassword/SetNewPassword';
import { Cards } from '../../PacksList/UserPacksList/ProfilePacks/Packs/Cards/Cards';

function Routess() {

    return (
        <Routes>
            <Route path='/' element={<Profile/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/restore' element={<RestorePassword/>}/>
            <Route path="/recover" element={<CheckEmail/>}/>
            <Route path='/set-new-password/:token' element={<SetNewPassword/>}/>
            <Route path='*' element={<Notfound/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/packs' element={<PacksList/>}/>
            <Route path='/packs/:cardId' element={<Cards/>}/>
        </Routes>
    );
}

export default Routess;