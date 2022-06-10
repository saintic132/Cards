import React, {useEffect, useState} from 'react';
import SuperInputText from "../../../../../common/buttons/c1-SuperInputText/SuperInputText";
import style from "./ProfilePacksList.module.css";
import {PackList} from "./Packs/PackList";
import search from '../../../../../assets/img/search_bar/search.png'
import {useDebounce} from "../../../../../common/hooks/useDebounde/useDebounce";
import {useAppDispatch} from "../../../../../store/store";
import {setSearchPacksValueAC} from "../../../../../store/reducers/packs-reducer";

export const ProfilePacksList = () => {

    const dispatch = useAppDispatch()
    const [searchPack, setSearchPack] = useState<string>('');
    const debouncedValue = useDebounce<string>(searchPack, 750)

    const changeText = (value: string) => {
        setSearchPack(value)
    }

    useEffect(() => {
        dispatch(setSearchPacksValueAC(debouncedValue))
    },[debouncedValue, dispatch])

    return (
        <div className={style.packs__body}>
            <h2>
                My packs list
            </h2>
            <SuperInputText
                className={style.profile__body_input_search}
                placeholder="Search..."
                value={searchPack}
                onChangeText={changeText}
            />
            <img
                className={style.profile__body_img_search}
                src={search}
                alt="search"/>
            {/*Компонента с отрисовкой Карточек*/}
            <PackList/>
        </div>
    )
}