import React, {memo} from 'react';
import style from './PacksCardsFilter.module.css'
import {useAppDispatch, useAppSelector} from "../../../../../store/store";
import {setActiveUserPacksOnlyAC} from "../../../../../store/reducers/packs-reducer";

export const PacksCardsFilter = memo(() => {

    const profileData = useAppSelector(state => state.packs.activeUserPacks)
    const dispatch = useAppDispatch()

    const changeActivePacksToUser = () => {
        dispatch(setActiveUserPacksOnlyAC('userPacks'))
    }

    const changeActivePacksToAll = () => {
        dispatch(setActiveUserPacksOnlyAC('allPacks'))
    }

    return (
        <div className={style.packsCardsFilter__container}>
            <div className={style.packsCardsFilter__body}>
                <h4>Show packs cards</h4>
                <div className={style.packsCardsFilter__buttons}>
                    <div
                        className={profileData === 'userPacks' ? style.packsCardsFilter__active_field : style.packsCardsFilter__not_active_field}
                        onClick={changeActivePacksToUser}
                    >
                        My
                    </div>
                    <div
                        className={profileData === 'allPacks' ? style.packsCardsFilter__active_field : style.packsCardsFilter__not_active_field}
                        onClick={changeActivePacksToAll}
                    >
                        All
                    </div>
                </div>
            </div>
        </div>
    )
})