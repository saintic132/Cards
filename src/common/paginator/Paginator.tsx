import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './Paginator.module.css'

type PaginatorPropsType = {
    currentPage: number
    allPacksCount: number
    packsCountOnPage: number
    setCurrentPage: (page: number) => void
    selectPageCount: number
    setSelectPageCount: (value: number) => void
    portionPageSize?: number
}

export function Paginator({
                              currentPage,
                              allPacksCount,
                              packsCountOnPage,
                              setCurrentPage,
                              selectPageCount,
                              setSelectPageCount,
                              portionPageSize = 10
                          }: PaginatorPropsType) {

    const pagesCount = Math.ceil(allPacksCount / packsCountOnPage)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionPageSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionNumber = (portionNumber - 1) * portionPageSize + 1
    const rightPortionNumber = portionNumber * portionPageSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionPageSize))
    }, [currentPage, portionPageSize])

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectPageCount(+e.currentTarget.value)
    }

    return (
        <div className={style.paginator__container}>
            <span className={style.paginator__count}>
                {
                    portionNumber > 1
                        ? <div
                            className={style.paginator__countByLeft}
                            onClick={() => setPortionNumber(portionNumber - 1)}>
                            &lt;
                        </div>
                        : <div className={style.fakeDiv}/>
                }
                {
                    pages
                        .filter(page => page >= leftPortionNumber && page <= rightPortionNumber)
                        .map(page => {
                            return (
                                <span
                                    key={page}
                                    className={currentPage === page ? style.paginator__page_bold : style.paginator__page}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </span>
                            )
                        })
                }
                {
                    portionCount > portionNumber
                    && <div
                        className={style.paginator__countBy}
                        onClick={() => setPortionNumber(portionNumber + 1)}>
                        &gt;
                    </div>
                }
            </span>
            <div className={style.paginator__count_per_page}>
                Show
                <div className={style.paginator__select_container}>
                    <select
                        className={style.paginator__select}
                        value={selectPageCount}
                        onChange={onChangeCallback}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <span>Cards per Page</span>
            </div>
        </div>
    )
}