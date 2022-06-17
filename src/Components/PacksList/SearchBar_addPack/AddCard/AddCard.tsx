import React, {useState} from 'react';
import style from "./AddCard.module.css";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../Bll/store";
import SuperInputText from "../../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Common/c2-SuperButton/SuperButton";
import {addCardTC} from "../../../../Bll/reducers/card-reducer";

type AddCardType = {
    setToggleModal: (toggle: boolean) => void
}

export const AddCard = ({setToggleModal}: AddCardType) => {

    const dispatch = useAppDispatch()

    const disableButton = useSelector<AppStoreType, boolean>(state => state.profile.helpers.disableButton)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.profile.helpers.errorMessage)

    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newAnswer, setNewAnswer] = useState<string>('');

    const addNewQuestion = () => {
        if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
            dispatch(addCardTC(newQuestion, newAnswer))
            setToggleModal(false)
        }
    }

    const onClickCloseModal = () => {
        setToggleModal(false)
    }

    return (
        <div className={style.addPack}>
            <div className={style.addPack__title}>
                Card info
            </div>
            <div className={style.addPack__body}>
                <label>Question</label>
                <SuperInputText
                    className={style.addPack__input}
                    value={newQuestion}
                    onChangeText={setNewQuestion}
                    type='text'
                    placeholder='Enter the Question'
                    disabled={disableButton}
                />
                <SuperInputText
                    type='file'
                    disabled={disableButton}
                />
            </div>
            <div className={style.addPack__body}>
                <label>Answer</label>
                <SuperInputText
                    className={style.addPack__input}
                    value={newAnswer}
                    onChangeText={setNewAnswer}
                    type='text'
                    placeholder='Enter the Answer'
                    disabled={disableButton}
                />
                <SuperInputText
                    type='file'
                    disabled={disableButton}
                />
            </div>
            {
                !errorMessage &&
                <div className={style.fakeDiv}/>
            }
            {
                errorMessage &&
                <div className={style.addPack_server_error}>
                    {errorMessage}
                </div>
            }
            <div className={style.addPack__buttons}>
                <SuperButton
                    className={style.addPack__button_cancel}
                    onClick={onClickCloseModal}
                    disabled={disableButton}
                >
                    Cancel
                </SuperButton>
                <SuperButton
                    className={style.addPack__button_save}
                    onClick={addNewQuestion}
                    disabled={disableButton}
                >
                    Save
                </SuperButton>
            </div>
        </div>
    )
}