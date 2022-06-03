import React, {memo} from 'react';
import style from "./CardsFilter.module.css";
import SuperInputText from "../../../../../common/c4-common_buttons/c1-SuperInputText/SuperInputText";

export const CardsFilter = memo(() => {
    return (
        <div className={style.userProfile__params}>
            <h4>Number of cards</h4>
            <div className={style.userProfile__params_inputs}>
                <SuperInputText
                    className={style.userProfile__params_input}
                    placeholder='от'
                />
                <SuperInputText
                    className={style.userProfile__params_input}
                    placeholder='до'
                />
            </div>
        </div>
    )
})