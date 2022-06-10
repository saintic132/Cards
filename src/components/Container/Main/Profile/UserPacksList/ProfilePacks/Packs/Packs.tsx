import React, {memo, useState} from 'react';
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import sortIcon from "../../../../../../../assets/img/sort/sort.png";
import SuperButton from "../../../../../../../common/buttons/c2-SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../../../../../store/store";
import {getPacksTC} from "../../../../../../../store/reducers/packs-reducer";

export const Packs = memo(() => {

    const packs = useAppSelector(state => state.packs.cardPacks)
    const searchTextValue = useAppSelector(state => state.packs.searchText)
    const selectPageCount = useAppSelector(state => state.packs.pageCount)

    const [sortNumber, setSortNumber] = useState<number>(0);

    const dispatch = useAppDispatch()

    const onClickHandleSortByUpdate = () => {
        if (sortNumber === 1) {
            dispatch(getPacksTC(searchTextValue, '0updated', 1, selectPageCount))
            setSortNumber(0)
        } else {
            dispatch(getPacksTC(searchTextValue, '1updated', 1, selectPageCount))
            setSortNumber(1)
        }
    }

    return (
        <div className={style.packList__body}>
            <div className={style.packList__row}>
                <span className={style.packList__name}>
                    Name
                </span>
                <span className={style.packList__cards}>
                    Cards
                </span>
                <span className={style.packList__updates} onClick={onClickHandleSortByUpdate}>
                        Last Updated
                    <img
                        className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                        src={sortIcon}
                        alt="sort"
                    />
                </span>
                <span className={style.packList__create}>
                    Created by
                </span>
                <span className={style.packList__action}>
                    Actions
                </span>
            </div>

            {
                packs && packs.map(pack => {
                    return (
                        <div
                            key={pack._id}
                            className={style.packList__list}
                        >
                            <span className={style.packList__name}>
                                  <NavLink to={'/packs/' + pack._id}>
                                     {pack.name}
                                  </NavLink>
                            </span>
                            <span className={style.packList__cards}>
                                {pack.cardsCount}</span>
                            <span className={style.packList__updates_none_clicked}>
                                    {pack.updated}
                            </span>
                            <span className={style.packList__create}>
                                {pack.user_name}
                            </span>
                            <span className={style.packList__action}>
                                <SuperButton className={style.packList__button_delete}>
                                    Delete
                                </SuperButton>
                                <SuperButton className={style.packList__button_edit_learn}>
                                    Edit
                                </SuperButton>
                                <SuperButton className={style.packList__button_edit_learn}>
                                    Learn
                                </SuperButton>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
})