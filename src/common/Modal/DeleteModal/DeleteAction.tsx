import React from 'react';
import style from "../Styles/EditAction.module.css";
import closeIcon from "../../img/delete/delete.png";
import SuperButton from "../../c2-SuperButton/SuperButton";

type PropsType = {
    currentMode: string
    initialName: string
    setToggleModal: (toggle: boolean) => void
    deletePack: () => void
}


const DeleteAction = ({currentMode, initialName, setToggleModal, deletePack}: PropsType) => {

    const onClickCloseModal = () => {
        setToggleModal(false)
    }

    const deletePackHandler = () => {
        deletePack()
        setToggleModal(false)
    }

    return (
        <div className={style.main}>
            <div className={style.header}>

                {
                    (currentMode === 'packs') &&
                    <div className={style.title}>
                        Delete Pack
                    </div>
                }

                {
                    (currentMode === 'cards') &&
                    <div className={style.title}>
                        Delete Card
                    </div>
                }

                <img
                    onClick={onClickCloseModal}
                    src={closeIcon}
                    alt="close"
                />
            </div>
            <div className={style.body}>
                Do you really want to remove <b>{initialName}?</b>
                <br/>
                All cards will be excluded from this course.
            </div>
            <div className={style.buttons}>
                <SuperButton
                    className={style.addPack__button_cancel}
                    onClick={onClickCloseModal}
                >
                    Cancel
                </SuperButton>
                <SuperButton
                    className={style.addPack__button_save}
                    onClick={deletePackHandler}
                >
                    Delete
                </SuperButton>
            </div>
        </div>
    );
};

export default DeleteAction;