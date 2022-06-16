import React, {ChangeEvent, useState} from 'react';
import SuperButton from "../../../../../Common/c2-SuperButton/SuperButton";
import style from './LearnPack.module.css'
import closeIcon from "../../../../../Common/img/delete/delete.png"
import {useDispatch, useSelector} from "react-redux";
import {setLearnToggleAC, updateRaitingCardTC} from "../../../../../Bll/reducers/card-reducer";
import {AppStoreType, ThunksDispatch} from "../../../../../Bll/store";
import {CardType} from "../../../../../Bll/api";
import {PacksType} from "../../../../../Bll/reducers/pack-reducer";

type PropsType = {
    packId: string
    cards: CardType[]
    index: number
}

const LearnPack = React.memo((props: PropsType) => {

    const packID = useSelector<AppStoreType, string>(state => state.cards.pack_id)

    const packName = useSelector<AppStoreType, PacksType[]>(state => state.packs.cardPacks.filter(el => el._id === packID))

    const [answer, setAnswer] = useState<boolean>(false)

    const [selectValue, setSelectValue] = useState<number>(5)

    const [index, setIndex] = useState<number>(props.index)

    const dispatch = useDispatch<ThunksDispatch>()

    const setToggleModal = () => {
        dispatch(setLearnToggleAC(false, ''))
    }

    const nextAnswer = (carId: string) => {
        dispatch(updateRaitingCardTC({grade: selectValue, card_id: carId}))
        setAnswer(false)
        setIndex(index < (props.cards.length - 1) ? index + 1 : 0)
    }

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(Number(e.currentTarget.value))
    }

    //const index = props.cards.length > 0 ? Math.ceil((Math.random()*props.cards.length)) - 1 : 0

    return (
        <div className={style.learn}>
            <div className={style.learn__header}>
                <h6>Текущий рейтинг вопроса: {Math.ceil(props.cards[index].grade)}</h6>
                <img
                    onClick={setToggleModal}
                    src={closeIcon}
                    alt="close"
                />
            </div>
            <div className={style.learn__title}>
                Learn {packName[0].name}
            </div>
            <div className={style.learn__body}>
                <h4 style={{textAlign: "center"}}>Question: <span> {index >= 0 && props.cards[index].question}</span>
                </h4>
            </div>

            <div>
                {
                    !answer
                        ? <div className={style.learn__buttons}>
                            <SuperButton
                                className={style.learn__button_cancel}
                                onClick={setToggleModal}
                            >
                                Cancel
                            </SuperButton>
                            <SuperButton
                                className={style.learn__button_save}
                                onClick={() => {
                                    setAnswer(true)
                                }}
                            >
                                Show answer
                            </SuperButton></div>
                        : ''
                }
            </div>
            {answer &&
            <div>
                <div style={{textAlign: "center"}}><span style={{margin: '0 auto'}}>{props.cards[index].answer}</span>
                </div>

                <div>Оцените вопрос:

                    <div>
                        <select value={selectValue} onChange={selectHandler}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>


                </div>
                <div className={style.learn__buttons}><SuperButton
                    className={style.learn__button_cancel}
                    onClick={setToggleModal}
                >
                    Cancel
                </SuperButton>
                    <SuperButton
                        className={style.learn__button_save}
                        onClick={() => {
                            nextAnswer(props.cards[index]._id)
                        }}
                    >NextAnswer</SuperButton></div>
            </div>

            }
        </div>

    );
})

export default LearnPack;