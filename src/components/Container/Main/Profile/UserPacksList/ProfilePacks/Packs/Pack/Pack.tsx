import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../../../../store/store";
import style from "./Pack.module.css";
import arrow from '../../../../../../../../assets/img/arrow/arrow.png'
import SuperInputText from "../../../../../../../../common/buttons/c1-SuperInputText/SuperInputText";
import search from "../../../../../../../../assets/img/search_bar/search.png";
import {Questions} from "./Questions/Questions";
import {Paginator} from "../../../../../../../../common/paginator/Paginator";

export const Pack = () => {

    const {pack} = useParams<'pack'>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectPageCount, setSelectPageCount] = useState(5);
    const packsCountOnPage = useAppSelector(state => state.cards.pageCount)
    const packsTotalCount = useAppSelector(state => state.cards.cardPacksTotalCount)
    const page = useAppSelector(state => state.cards.page)


    useEffect(() => {
        if (pack) {
            console.log('hello')
        }
    }, [dispatch, pack])


    useEffect(() => {
        setCurrentPage(page)
    }, [page])

    return (
        <div className={style.pack__container}>
            <div className={style.pack__body}>
                <div className={style.pack__header}>
                    <img
                        src={arrow} alt="back"
                        onClick={() => navigate(-1)}
                    />
                    <h4>Pack Name</h4>
                </div>
                <div className={style.pack__body_inputs_bar}>
                    <SuperInputText
                        className={style.pack__body_input_search}
                        placeholder="Search..."
                        // value={searchPack}
                        // onChangeText={changeText}
                    />
                    <img
                        className={style.pack__body_img_search}
                        src={search}
                        alt="search"/>
                </div>

                <Questions />

                <Paginator
                    currentPage={currentPage}
                    allPacksCount={packsTotalCount}
                    packsCountOnPage={packsCountOnPage}
                    setCurrentPage={setCurrentPage}
                    selectPageCount={selectPageCount}
                    setSelectPageCount={setSelectPageCount} />

            </div>
        </div>
    )
}