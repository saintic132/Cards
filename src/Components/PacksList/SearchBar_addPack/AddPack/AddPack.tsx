import React, {useState} from 'react';
import style from "./AddPack.module.css";
import closeIcon from '../../../../Common/img/delete/delete.png'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../Bll/store";
import {newCardPackTC} from "../../../../Bll/reducers/pack-reducer";
import SuperInputText from "../../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Common/c2-SuperButton/SuperButton";

type AddPackType = {
    setToggleModal: (toggle: boolean) => void
}

export const AddPack = ({setToggleModal}: AddPackType) => {

    const dispatch = useAppDispatch()
    const disableButton = useSelector<AppStoreType, boolean>(state => state.profile.helpers.disableButton)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.profile.helpers.errorMessage)

    const [newPackName, setNewPackName] = useState<string>('');

    const addNewPack = () => {
        if (newPackName.trim() !== '') {
            dispatch(newCardPackTC(newPackName))
            setToggleModal(false)
        }
    }

    const onClickCloseModal = () => {
        setToggleModal(false)
    }



    return (
        <div className={style.addPack}>
            <div className={style.addPack__header}>
                <div className={style.addPack__title}>
                    Add new pack
                </div>

                {
                    !disableButton &&
                    <img
                        onClick={onClickCloseModal}
                        src={closeIcon}
                        alt="close"
                    />
                }

            </div>
            <div className={style.addPack__body}>
                <label>Name pack</label>
                <SuperInputText
                    className={style.addPack__input}
                    value={newPackName}
                    onChangeText={setNewPackName}
                    type='text'
                    placeholder='Enter name'
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
                    onClick={addNewPack}
                    disabled={disableButton}
                >
                    Save
                </SuperButton>
            </div>
        </div>
    )
}