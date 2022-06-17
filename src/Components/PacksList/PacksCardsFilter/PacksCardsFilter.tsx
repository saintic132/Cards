import React, {memo} from 'react';
import style from './PacksCardsFilter.module.css'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../Bll/store";
import {setMyAllAC} from "../../../Bll/reducers/pack-reducer";

export const PacksCardsFilter = memo(() => {

    const profileData = useSelector<AppStoreType, boolean>(state => state.packs.myAll)
    const dispatch = useAppDispatch()

    const changeActivePacksToUser = () => {
        dispatch(setMyAllAC(true))
    }

    const changeActivePacksToAll = () => {
        dispatch(setMyAllAC(false))
    }

    return (
        <div className={style.packsCardsFilter__container}>
            <div className={style.packsCardsFilter__body}>
                <h4>Show packs cards</h4>
                <div className={style.packsCardsFilter__buttons}>
                    <div
                        className={profileData ? style.packsCardsFilter__active_field : style.packsCardsFilter__not_active_field}
                        onClick={changeActivePacksToUser}
                    >
                        My
                    </div>
                    <div
                        className={!profileData ? style.packsCardsFilter__active_field : style.packsCardsFilter__not_active_field}
                        onClick={changeActivePacksToAll}
                    >
                        All
                    </div>
                </div>
            </div>
        </div>
    )
})