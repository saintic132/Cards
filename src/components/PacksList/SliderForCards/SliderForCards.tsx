import React from 'react';
import s from "./SliderForCards.module.css";
import SuperDoubleRange from "../../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import {setCardsTC, setRangeValueAC} from "../../../Bll/reducers/pack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppStoreType} from "../../../Bll/store";

const SliderForCards = () => {

    const dispatch = useDispatch<Dispatch<any>>()

    const rangeValue = useSelector<AppStoreType, number[]>(state => state.packs.rangeValue)

    const onMouseUpHandler = () => {
        dispatch(setCardsTC())
    }

    const setRangeValue = (newRangeValue: number[]) => {
        dispatch(setRangeValueAC(newRangeValue))
    }

    return (
        <div className={s.sidebar}>
            <SuperDoubleRange
                width={'200px'}
                value={rangeValue}
                onMouseFunc={onMouseUpHandler}
                handleChange={(value1, value2) => {
                    setRangeValue([value1, value2])
                }}/>
        </div>
    );
};

export default SliderForCards;