import React, {useState} from 'react';
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../../Bll/store";
import {deleteCardPackTC, editPackTC, PacksType, setSortPacksAC} from '../../../../../Bll/reducers/pack-reducer';
import sortIcon from '../../../../../Common/img/sort/sort.png'
import {Modal} from "../../../../../Common/Modal/Modal";
import DeleteAction from "../../../../../Common/Modal/DeleteModal/DeleteAction";
import {ActionButtons} from "./ActionButtons/ActionButtons";
import SuperButton from "../../../../../Common/c2-SuperButton/SuperButton";
import LearnPack from "../LearnPack/LearnPack";
import {getCardsTC} from "../../../../../Bll/reducers/card-reducer";
import EditPack from "../../../../../Common/Modal/EditModal/EditAction";



export const Packs = () => {

    const packs = useSelector<AppStoreType, PacksType[]>(state => state.packs.cardPacks)
    const cards = useSelector<AppStoreType, any>(state => state.cards.cards)
    const sortPacks = useSelector<AppStoreType, string>(state => state.packs.sortPacks)
    const sortNumber = useSelector<AppStoreType, number>(state => state.packs.sortNumber)
    const toggleModalLearn = useSelector<AppStoreType, boolean>(state => state.cards.toggleModalLearn)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)

    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [currentModal, setCurrentModal] = useState<string>('');

    const [cardIDForEditMode, setCardIDForEditMode] = useState<string>('')


    const [packName, setPackName] = useState<string>('');

    const dispatch = useAppDispatch()

    const handleSortField = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.field) {
            const trigger: string = e.currentTarget.dataset.field
            if (!sortNumber) {
                dispatch(setSortPacksAC(1 + trigger, 1))
            } else {
                dispatch(setSortPacksAC(0 + trigger, 0))
            }
        }
    }

    const clickActiveModal = (packId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, packName: string) => {
        setCardIDForEditMode(packId)
        if (e.currentTarget.textContent === 'Delete') {
            packName && setPackName(packName)
            setCurrentModal(e.currentTarget.textContent)
            setToggleModal(true)
        } else if (e.currentTarget.textContent === 'Edit') {
            packName && setPackName(packName)
            setCurrentModal(e.currentTarget.textContent)
            setToggleModal(true)
        }
    }

    const deletePack = () => {
        dispatch(deleteCardPackTC(cardIDForEditMode))
    }

    const changePackName = (value: string) => {
        dispatch(editPackTC(cardIDForEditMode, value))
    }

    const setToggleLearn =(packId: string, packName: string)=>{
        setCardIDForEditMode(packId)
        dispatch(getCardsTC(packId, true))
    }

    const index = cards.length > 0 ? Math.ceil((Math.random() * cards.length)) - 1 : 0

    return (
        <div className={style.packList__body}>
            <div className={style.packList__row}>
                <span
                    className={style.packList__name}
                    data-field="name"
                    onClick={handleSortField}
                >
                    Name

                    {
                        sortPacks.includes('name') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }

                </span>
                <span
                    className={style.packList__cards}
                    data-field="cardsCount"
                    onClick={handleSortField}
                >
                    Cards

                    {
                        sortPacks.includes('cardsCount') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }

                </span>
                <span
                    className={style.packList__updates}
                    data-field="updated"
                    onClick={handleSortField}
                >
                        Last Updated

                    {
                        sortPacks.includes('updated') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }

                </span>
                <span
                    className={style.packList__create}
                    data-field="user_name"
                    onClick={handleSortField}
                >
                    Created by

                    {
                        sortPacks.includes('user_name') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }

                </span>
                <span className={style.packList__action}>
                    Actions
                </span>
            </div>

            {
                toggleModal &&
                <Modal toggleModal={toggleModal}>

                    {
                        currentModal === 'Delete' ?
                            <DeleteAction
                                currentMode='packs'
                                initialName={packName}
                                deletePack={deletePack}
                                setToggleModal={(toggle) => setToggleModal(toggle)}
                            />
                            : <EditPack
                                currentMode='packs'
                                packName={packName}
                                changePackName={changePackName}
                                setToggleModal={(toggle) => setToggleModal(toggle)}
                            />
                    }

                </Modal>
            }

            {
                toggleModalLearn && cards.length > 0 &&
                <Modal toggleModal={toggleModalLearn}>

                    <LearnPack cards={cards} index={index} packId={cardIDForEditMode}/>
                </Modal>
            }

            {
                packs && packs.map(pack => {
                    return (
                        <div
                            key={pack._id}
                            className={style.packList__list}
                        >
                            <span className={style.packList__name_none_clicked}>
                                  <NavLink to={'/packs/' + pack._id}>
                                     {pack.name}
                                  </NavLink>
                            </span>
                            <span className={style.packList__cards_none_clicked}>
                                {pack.cardsCount}
                            </span>
                            <span className={style.packList__updates_none_clicked}>
                                    {pack.updated}
                            </span>
                            <span className={style.packList__create_none_clicked}>
                                {pack.user_name}
                            </span>

                            <span className={style.actionButtons__action}>

                            {
                                (userID === pack.user_id) &&

                                <ActionButtons
                                    attributeId={pack._id}
                                    nameAttribute={pack.name}
                                    clickActiveModal={clickActiveModal}
                                />

                            }
                                <SuperButton
                                    className={style.packList__button_edit_learn}
                                    onClick={() => setToggleLearn(pack._id, pack.name)}
                                >
                                    Learn
                                </SuperButton>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}