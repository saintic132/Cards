import React, {memo} from 'react';
import style from './Stars.module.css'
import star from '../../../../Common/img/stars/star.png'
import noneStar from '../../../../Common/img/stars/none_star.png'

type StarsPropsType = {
    stars: boolean
}

export const Stars = memo(({stars}: StarsPropsType) => {
    return (
        <div className={style.starRating}>

            {
                stars
                    ? <img src={star} alt="star"/>
                    : <img src={noneStar} alt="noneStar"/>
            }

        </div>
    )
})