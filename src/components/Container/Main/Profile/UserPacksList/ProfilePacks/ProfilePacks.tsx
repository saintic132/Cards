import React, {memo, useEffect, useState} from 'react';
import style from './ProfilePacks.module.css'
import {useAppDispatch, useAppSelector} from "../../../../../../store/store";
import {getPacksTC} from "../../../../../../store/reducers/packs-reducer";
import {Paginator} from "../../../../../../common/paginator/Paginator";
import {Packs} from "./Packs/Packs";

export const ProfilePacks = memo(() => {

    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const searchTextValue = useAppSelector(state => state.packs.searchText)
    const packsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const packsCountOnPage = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const activeUserPacks = useAppSelector(state => state.packs.activeUserPacks)

    const dispatch = useAppDispatch()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectPageCount, setSelectPageCount] = useState(5);

    useEffect(() => {
        dispatch(getPacksTC(searchTextValue, sortPacks, currentPage, selectPageCount))
    }, [activeUserPacks, searchTextValue, sortPacks, currentPage, selectPageCount, dispatch])

    useEffect(() => {
        setCurrentPage(page)
    }, [page])

    return (
        <div className={style.packList__container}>

            <Packs />

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
})