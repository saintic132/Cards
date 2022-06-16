import React from 'react';
import style from './Modal.module.css'

type PropsType = {
    toggleModal: boolean
    children: React.ReactNode
}

export const Modal = ({children, toggleModal}: PropsType) => {

    return (
        <div className={toggleModal ? `${style.modal} ${style.active}` : style.modal}>
            <div className={toggleModal ? `${style.modal__content} ${style.active}` : style.modal__content}
                 onClick={e => e.stopPropagation()}>
                <div className={style.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}