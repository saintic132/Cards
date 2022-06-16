import React from 'react';
import SuperButton from "../../../../../../Common/c2-SuperButton/SuperButton";
import style from "./ActionButtons.module.css";

type ActionButtonsPropsType = {
    attributeId: string
    nameAttribute: string
    secondAttribute?: string
    clickActiveModal: (packId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, packName: string, secondAttribute?: string) => void
}

export const ActionButtons = ({
                                  attributeId,
                                  nameAttribute,
                                  secondAttribute,
                                  clickActiveModal
                              }: ActionButtonsPropsType) => {

    return (
        <>
            <SuperButton
                onClick={(e) => clickActiveModal(attributeId, e, nameAttribute)}
                className={style.actionButtons__button_delete}
            >
                Delete
            </SuperButton>

            <SuperButton
                onClick={(e) => clickActiveModal(attributeId, e, nameAttribute, secondAttribute)}
                className={style.actionButtons__button_edit_learn}
            >
                Edit
            </SuperButton>
        </>
    )
}