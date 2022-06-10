import React, {memo, useEffect, useState} from 'react';
import style from "./SearchBar.module.css";
import SuperInputText from "../../../../../../common/buttons/c1-SuperInputText/SuperInputText";
import search from "../../../../../../assets/img/search_bar/search.png";
import SuperButton from "../../../../../../common/buttons/c2-SuperButton/SuperButton";
import {useAppDispatch} from "../../../../../../store/store";
import {useDebounce} from "../../../../../../common/hooks/useDebounde/useDebounce";
import {addPacksTC, setSearchPacksValueAC} from "../../../../../../store/reducers/packs-reducer";

type SearchBarPropsType = {
    loadProfile?: true
}

export const SearchBar = memo(({loadProfile}: SearchBarPropsType) => {

    const dispatch = useAppDispatch()

    const [searchPack, setSearchPack] = useState<string>('');
    const debouncedValue = useDebounce<string>(searchPack, 750)

    const changeText = (value: string) => {
        setSearchPack(value)
    }

    const addNewPack = () => {
        dispatch(addPacksTC())
    }

    useEffect(() => {
        dispatch(setSearchPacksValueAC(debouncedValue))
    }, [debouncedValue, dispatch])

    return (
        <div className={style.profile__body_inputs_bar}>
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
            {
                !loadProfile
                &&
                <SuperButton
                    className={style.profile__body_input_button}
                    onClick={addNewPack}
                >
                    Add new pack
                </SuperButton>
            }
        </div>
    )
})