import React, {memo} from 'react';
import style from "./UserPacksList.module.css";
import {ProfilePacks} from "./ProfilePacks/ProfilePacks";
import {SearchBar} from "./SearchBar/SearchBar";

type ProfilePacksListType = {
    loadProfile?: true
}

export const UserPacksList = memo(({loadProfile}: ProfilePacksListType) => {

    return (
        <div className={style.packs__body}>
            <h2>
                My packs list
            </h2>

            <SearchBar loadProfile={loadProfile}/>

            <ProfilePacks/>

        </div>
    )
})