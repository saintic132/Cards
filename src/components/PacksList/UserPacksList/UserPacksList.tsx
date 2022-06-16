import React from 'react';
import style from "./UserPacksList.module.css";
import {ProfilePacks} from './ProfilePacks/ProfilePacks';
import {AddPack} from "../SearchBar_addPack/AddPack/AddPack";
import {SearchBarAddPack} from '../SearchBar_addPack/SearchBarAddPack';

export const UserPacksList = () => {

    return (
        <div className={style.packs__body}>
            <h2>
                My packs list
            </h2>

            <SearchBarAddPack
                show
                buttonName='Add new pack'
                ModalComponent={AddPack}
            />

            <ProfilePacks/>

        </div>
    )
}