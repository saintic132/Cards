import React, {memo} from 'react';
import style from './Rating.module.css'
import {Stars} from "./Stars/Stars";

type RatingPropsType = {
    rating: number
}

export const Rating = memo(({rating}: RatingPropsType) => {
    return (
        <div className={style.rating}>
            <Stars stars={rating > 1}/>
            <Stars stars={rating > 2}/>
            <Stars stars={rating > 3}/>
            <Stars stars={rating > 4}/>
            <Stars stars={rating > 5}/>
        </div>
    )
})