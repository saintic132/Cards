import React, {memo, useState} from 'react';
import style from "./CardsFilter.module.css";
import {useAppDispatch, useAppSelector} from "../../../../../store/store";
import {
    getPacksTC,
    setMaxCardsFilterValueAC,
    setMinCardsFilterValueAC
} from "../../../../../store/reducers/packs-reducer";
import SuperButton from "../../../../../common/buttons/c2-SuperButton/SuperButton";

export const CardsFilter = memo(() => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const searchText = useAppSelector(state => state.packs.searchText)

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch()


    const changeMinValueCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errorMessage) setErrorMessage(null)
        let value = +e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (value > maxCardsCount) {
            setErrorMessage('Min value must be less then Max value')
        } else {
            dispatch(setMinCardsFilterValueAC(value))
        }
    }

    const changeMaxValueCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errorMessage) setErrorMessage(null)
        let value = +e.currentTarget.value
        if (!isFinite(+value)) return;
        if (value > 110) {
            setErrorMessage('Max number of cards is 110')
        } else {
            dispatch(setMaxCardsFilterValueAC(value))
        }
    }

    const onClickApplyFilterValue = () => {
        if (errorMessage) {
            setErrorMessage(null)
        }
        dispatch(getPacksTC(searchText, sortPacks, 1, pageCount))
    }

    return (
        <div className={style.cardsFilter__params}>
            <h4>Number of cards</h4>
            <div className={style.cardsFilter__params_inputs}>
                <input
                    className={style.cardsFilter__params_input}
                    type='number'
                    value={Number(minCardsCount).toString()}
                    onChange={changeMinValueCount}
                    placeholder='от'
                />
                <input
                    className={style.cardsFilter__params_input}
                    type='number'
                    value={Number(maxCardsCount).toString()}
                    onChange={changeMaxValueCount}
                    placeholder='до'
                />
            </div>
            <div className={style.cardsFilter__buttonFilter_container}>
                <SuperButton
                    className={style.cardsFilter__button_filter}
                    onClick={onClickApplyFilterValue}>
                    Filter
                </SuperButton>
            </div>
            {
                errorMessage && <div className={style.cardsFilter__server_error}>{errorMessage}</div>
            }
        </div>
    )
})