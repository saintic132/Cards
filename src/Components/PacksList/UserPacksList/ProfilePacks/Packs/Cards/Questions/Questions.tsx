import React, {useState} from 'react';
import style from './Questions.module.css'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../../../../Bll/store";
import {CardType} from "../../../../../../../Bll/api";
import {ActionButtons} from "../../ActionButtons/ActionButtons";
import {Modal} from "../../../../../../../Common/Modal/Modal";
import DeleteAction from "../../../../../../../Common/Modal/DeleteModal/DeleteAction";
import EditPack from "../../../../../../../Common/Modal/EditModal/EditAction";
import {deleteCardTC, editCardTC} from "../../../../../../../Bll/reducers/card-reducer";
import {Rating} from "../../../../../../features/Rating/Rating";

export const Questions = () => {

    const dispatch = useAppDispatch()

    const questions = useSelector<AppStoreType, CardType[]>(state => state.cards.cards)
    const packUserId = useSelector<AppStoreType, string>(state => state.cards.packUserId)
    const userId = useSelector<AppStoreType, string>(state => state.profile._id)

    const [cardIDForEditMode, setPackIDForEditMode] = useState<string>('');
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [currentModal, setCurrentModal] = useState<string>('');
    const [packName, setPackName] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');


    const clickActiveModal = (packId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, packName: string, question?: string) => {
        setPackIDForEditMode(packId)
        if (e.currentTarget.textContent === 'Delete') {
            packName && setPackName(packName)
            setCurrentModal(e.currentTarget.textContent)
            setToggleModal(true)
        } else if (e.currentTarget.textContent === 'Edit') {
            packName && setPackName(packName)
            question && setAnswer(question)
            setCurrentModal(e.currentTarget.textContent)
            setToggleModal(true)
        }
    }

    const deleteCard = () => {
        dispatch(deleteCardTC(cardIDForEditMode))
    }

    const changePackName = (question: string, answer?: string) => {
        if (!answer) {
            dispatch(editCardTC(cardIDForEditMode, question))
        } else {
            dispatch(editCardTC(cardIDForEditMode, question, answer))
        }
    }

    if (!questions.length) {
        return (
            <>
                {
                    packUserId === userId
                        ?
                        <div className={style.question__empty}>
                            This pack is empty. Click add new card to fill this pack
                        </div>
                        :
                        <div className={style.question__empty}>
                            This pack is empty.
                        </div>
                }
            </>
        )
    }

    return (
        <div className={style.question__container}>
            <div className={style.question__row}>
                <span className={style.question__question}>
                    Question
                </span>
                <span className={style.question__answer}>
                     Answer
                </span>
                <span className={style.question__updated}>
                     Last Updated
                </span>
                <span className={style.question__grade}>
                     Grade
                </span>

                {
                    packUserId === userId &&
                    <span className={style.question__actions}>
                        Actions
                    </span>
                }

            </div>

            {
                toggleModal &&
                <Modal toggleModal={toggleModal}>

                    {
                        currentModal === 'Delete' ?
                            <DeleteAction
                                currentMode='cards'
                                initialName={packName}
                                deletePack={deleteCard}
                                setToggleModal={(toggle) => setToggleModal(toggle)}
                            />
                            : <EditPack
                                currentMode='cards'
                                packName={packName}
                                initialAnswer={answer}
                                changePackName={changePackName}
                                setToggleModal={(toggle) => setToggleModal(toggle)}
                            />
                    }

                </Modal>
            }

            {
                questions && questions.map(quest => {
                    return (
                        <div
                            key={quest._id}
                            className={style.question__list}
                        >
                            <span className={style.question__question}>
                                {quest.question}
                            </span>
                            <span className={style.question__answer}>
                                {quest.answer}
                            </span>
                            <span className={style.question__updated}>
                                {quest.updated}
                            </span>
                            <span className={style.question__grade}>
                                <Rating
                                    rating={quest.grade}
                                />
                            </span>

                            {
                                packUserId === userId &&
                                <span className={style.question__action}>
                                    <ActionButtons
                                        attributeId={quest._id}
                                        nameAttribute={quest.question}
                                        secondAttribute={quest.answer}
                                        clickActiveModal={clickActiveModal}
                                    />
                                 </span>
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}