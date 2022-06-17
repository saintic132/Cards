import React from 'react';
import style from './PacksList.module.css'
import SliderForCards from "./SliderForCards/SliderForCards";
import {PacksCardsFilter} from './PacksCardsFilter/PacksCardsFilter';
import {UserPacksList} from './UserPacksList/UserPacksList';

const PacksList = () => {

    return (
        <div className={style.profile__container}>
            <div className={style.profile__body}>
                <div className={style.profile__body_profile}>

                    <PacksCardsFilter />

                    <SliderForCards />

                </div>
                <div className={style.profile__body_main}>

                    <UserPacksList />

                </div>
            </div>
        </div>
    );
};

export default PacksList;