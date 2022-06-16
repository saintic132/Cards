import React, {useEffect, useState} from 'react';
import SuperInputText from "../../c1-SuperInputText/SuperInputText";
import style from '../Styles/EditAction.module.css'
import closeIcon from "../../img/delete/delete.png";
import SuperButton from "../../c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../Bll/store";

type PropsType = {
    currentMode: string
    packName: string
    setToggleModal: (toggle: boolean) => void
    changePackName: (value: string, answer?: string) => void
    initialAnswer?: string
}

const EditPack = ({currentMode, packName, setToggleModal, changePackName, initialAnswer}: PropsType) => {

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('');
    const disableButton = useSelector<AppStoreType, boolean>(state => state.profile.helpers.disableButton)

    useEffect(() => {
        setQuestion(packName)
        if (initialAnswer) {
            setAnswer(initialAnswer)
        }
    }, [packName, initialAnswer])

    const onClickCloseModal = () => {
        setToggleModal(false)
    }

    const saveButtonHandler = () => {
        if (answer) {
            changePackName(question, answer)
        } else {
            changePackName(question)
        }
        setToggleModal(false)
    }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.title}>
                    {
                        (currentMode === 'packs') &&
                        <div className={style.title}>
                            Edit Pack
                        </div>
                    }

                    {
                        (currentMode === 'cards') &&
                        <div className={style.title}>
                            Edit Card
                        </div>
                    }

                </div>
                <img
                    onClick={onClickCloseModal}
                    src={closeIcon}
                    alt="close"
                />
            </div>

            <div className={style.body}>
                {
                    (currentMode === 'packs') &&
                    <label>New pack name</label>
                }
                {
                    (currentMode === 'cards') &&
                    <label>New question name</label>
                }
                <SuperInputText
                    className={style.input}
                    value={question}
                    onChangeText={setQuestion}
                    type='text'
                />
                {
                    (currentMode === 'cards') &&
                    <SuperInputText
                        type='file'
                        disabled={disableButton}
                    />
                }
            </div>

            {
                (currentMode === 'cards') &&
                <div className={style.body}>
                    <label>New answer</label>
                    <SuperInputText
                        className={style.input}
                        value={answer}
                        onChangeText={setAnswer}
                        type='text'
                        disabled={disableButton}
                    />
                    <SuperInputText
                        type='file'
                        disabled={disableButton}
                    />
                </div>
            }

            <div className={style.buttons}>
                <SuperButton
                    className={style.addPack__button_cancel}
                    onClick={onClickCloseModal}
                >
                    Cancel
                </SuperButton>
                <SuperButton
                    className={style.addPack__button_save}
                    onClick={saveButtonHandler}
                >
                    Save
                </SuperButton>
            </div>
        </div>
    );
};

export default EditPack;