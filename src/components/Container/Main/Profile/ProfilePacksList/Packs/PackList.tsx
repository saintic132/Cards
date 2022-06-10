import React, {useEffect, useState} from 'react';
import style from './PackList.module.css'
import {useAppDispatch, useAppSelector} from "../../../../../../store/store";
import {getPacksTC} from "../../../../../../store/reducers/packs-reducer";
import SuperButton from '../../../../../../common/buttons/c2-SuperButton/SuperButton';
import sortIcon from '../../../../../../assets/img/sort/sort.png'
import {Paginator} from "../../../../../../common/paginator/Paginator";

export const PackList = () => {

    const packs = useAppSelector(state => state.packs.cardPacks)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const searchTextValue = useAppSelector(state => state.packs.searchText)
    const packsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const packsCountOnPage = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)


    const dispatch = useAppDispatch()

    const [sortNumber, setSortNumber] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectPageCount, setSelectPageCount] = useState(5);

    useEffect(() => {
        dispatch(getPacksTC(searchTextValue, sortPacks, currentPage, selectPageCount))
    }, [searchTextValue, sortPacks, currentPage, selectPageCount, dispatch])

    useEffect(() => {
        setCurrentPage(page)
    }, [page])

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
        <div className={style.packList__container}>
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
                                {pack.name}
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
            <Paginator
                currentPage={currentPage}
                allPacksCount={packsTotalCount}
                packsCountOnPage={packsCountOnPage}
                setCurrentPage={setCurrentPage}
                selectPageCount={selectPageCount}
                setSelectPageCount={setSelectPageCount}
            />
        </div>

    )
}