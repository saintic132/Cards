import React, {ChangeEvent, useEffect} from 'react';
import {AppStoreType, useAppDispatch} from '../../../../Bll/store';
import style from './ProfilePacks.module.css'
import {useSelector} from "react-redux";
import {setCardsTC, setCurrentPageAC, setSelectValueAC} from "../../../../Bll/reducers/pack-reducer";
import {Packs} from './Packs/Packs';
import Select from '../../Select/Select';
import Preloader from "../../../../Common/Preloader/Preloader";
import Paginator from '../../../../Common/Paginator/Paginator';

export const ProfilePacks = () => {

    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.profile.helpers.loadingStatus) // for preloader
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppStoreType, number>(state => state.packs.page)
    const pageCount = useSelector<AppStoreType, number>(state => state.packs.pageCount)
    const selectValue = useSelector<AppStoreType, number>(state => state.packs.selectValue) // количество элементов на одной странице
    const sort = useSelector<AppStoreType, string>(state => state.packs.sortPacks)
    const my = useSelector<AppStoreType, boolean>(state => state.packs.myAll)
    const searchText = useSelector<AppStoreType, string>(state => state.packs.searchText)

    const dispatch = useAppDispatch()

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectValueAC(Number(e.currentTarget.value)))
    }

    useEffect(() => {
        dispatch(setCardsTC())
    }, [dispatch, my, sort, selectValue, page, searchText])

    const changePageNumber = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    return (
        <div className={style.packList__container}>
            {
                loadingStatus
                    ? <Preloader/>
                    : <>
                        <Packs />
                        <Select
                            selectValue={selectValue}
                            handleSelectChange={handleSelectChange}
                        />

                        <Paginator
                            currentPage={page}
                            totalItemsCount={cardPacksTotalCount}
                            pageSize={pageCount}
                            portionSize={5}
                            changePageNumber={changePageNumber}
                        />
                    </>
            }
        </div>

    )
}