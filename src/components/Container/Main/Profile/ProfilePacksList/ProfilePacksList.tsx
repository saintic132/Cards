import React from 'react';
import SuperInputText from "../../../../../common/buttons/c1-SuperInputText/SuperInputText";
import style from "./ProfilePacksList.module.css";
import {PackList} from "./Packs/PackList";

export const ProfilePacksList = () => {
    return (
        <>
            <h2>
                My packs list
            </h2>
            <SuperInputText
                className={style.profile__body_input_search}
                placeholder="Search..."
                // value={email}
            />
            {/*Компонента с отрисовкой Карточек*/}
            <PackList/>
        </>
    )
}