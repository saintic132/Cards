import React, {useState} from 'react';
import style from './PacksList.module.css'
import {PacksCardsFilter} from "./PacksCardsFilter/PacksCardsFilter";
import {CardsFilter} from "./CardsFilter/CardsFilter";
import {ProfilePacksList} from "./ProfilePacksList/ProfilePacksList";
import {Redirect} from "../../../../common/Redirect/Redirect";

type ProfilePropsType = {
    isLoginIn: boolean
}

const PacksList: React.FC<ProfilePropsType> = () => {

    const [activePage, setActive] = useState<'all' | 'my'>('all');


    return (
        <div className={style.profile__container}>
            <div className={style.profile__body}>
                <div className={style.profile__body_profile}>

                    {/*Компонента с отрисовкой User*/}
                    <PacksCardsFilter
                        activePage={activePage}
                        setActive={setActive}
                    />

                    {/*Компонента с отрисовкой фильра по количеству карт*/}
                    <CardsFilter/>
                </div>
                <div className={style.profile__body_main}>

                    {/*Компонента с отрисовкой Профиля карточек*/}
                    <ProfilePacksList/>
                </div>
            </div>
        </div>
    );
};

export default Redirect(PacksList)