import React, {useEffect, useState} from "react";
import style from './Paginator.module.css'
import SuperButton from "../c2-SuperButton/SuperButton";

type PaginatorType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    portionSize: number
    changePageNumber: (page: number) => void
}

const Paginator = ({currentPage, totalItemsCount, pageSize, portionSize, changePageNumber}: PaginatorType) => {

    const onPageChange = (page: number) => {
        changePageNumber(page)
    }

    let pagesCount = Math.ceil(totalItemsCount / pageSize) // делим все приходящие с сервера элементы на кол-во элементов отображаемых на одной странице

    let pages = []; // каждый номер страницы

    for (let i = 1; i <= pagesCount; i++) { // пробегаемся по кол-ву страниц и создаем для каждой соответствующую цифру в массиве
        pages.push(i);
    }

    let portionCount = Math.ceil(pages.length / portionSize) // делим количество страниц из массива на размер порций (151 / 10) (порция - количество отображаемых на пагинаторе элементов (а справа и слева будут кнопки))
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize))
    }, [currentPage, portionSize])

    return (
        <div className={style.paginator}>

            {
                (portionNumber === 1) &&
                <div
                    className={style.fakeDiv}
                />
            }

            {
                portionNumber > 1 &&
                <SuperButton
                    className={style.prev_button}
                    onClick={() => setPortionNumber(portionNumber - 1)}
                >
                    &lt;
                </SuperButton>
            }

            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return (
                            <div
                                key={p}
                                onClick={() => onPageChange(p)}
                                className={p === currentPage ? style.active : style.pageNumber}
                            >
                                {p}
                            </div>
                        )
                    })}

            {
                portionCount > portionNumber &&
                <SuperButton
                    className={style.next_button}
                    onClick={() => setPortionNumber(portionNumber + 1)}
                >
                    &gt;
                </SuperButton>
            }

        </div>
    )
}


export default Paginator