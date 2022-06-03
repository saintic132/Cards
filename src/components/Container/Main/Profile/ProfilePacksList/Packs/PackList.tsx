import React from 'react';
import style from './PackList.module.css'

export const PackList = () => {

    // const [packs, setPacks] = useState([
    //     {id: 1, name: 'Pack name', cards: 4, updates: '18.03.2021', created: 'Ivan Ivanov'},
    //     {id: 1, name: 'Pack name', cards: 4, updates: '18.03.2021', created: 'Ivan Ivanov'},
    //     {id: 1, name: 'Pack name', cards: 4, updates: '18.03.2021', created: 'Ivan Ivanov'},
    //     {id: 1, name: 'Pack name', cards: 4, updates: '18.03.2021', created: 'Ivan Ivanov'},
    //     {id: 1, name: 'Pack name', cards: 4, updates: '18.03.2021', created: 'Ivan Ivanov'},
    // ]);

    return (
        <div className={style.packList__container}>
            <div className={style.packList__row}>
                <span className={style.packList__name}>Name</span>
                <span className={style.packList__cards}>Cards</span>
                <span className={style.packList__updates}>Last Updated</span>
                <span className={style.packList__create}>Created by</span>
                <span className={style.packList__action}>Actions</span>
            </div>

            {/*Готовая таблица. Раскоментировать после получения данных*/}

            {/*{*/}
            {/*    packs && packs.map(p => {*/}
            {/*        return (*/}
            {/*            <div*/}
            {/*                key={p.id}*/}
            {/*                className={style.packList__list}*/}
            {/*            >*/}
            {/*                <span className={style.packList__name}>{p.name}</span>*/}
            {/*                <span className={style.packList__cards}>{p.cards}</span>*/}
            {/*                <span className={style.packList__updates}>{p.updates}</span>*/}
            {/*                <span className={style.packList__create}>{p.created}</span>*/}
            {/*                <span className={style.packList__action}>*/}
            {/*                    <SuperButton className={style.packList__button_delete}>*/}
            {/*                        Delete*/}
            {/*                    </SuperButton>*/}
            {/*                    <SuperButton className={style.packList__button_edit_learn}>*/}
            {/*                        Edit*/}
            {/*                    </SuperButton>*/}
            {/*                    <SuperButton className={style.packList__button_edit_learn}>*/}
            {/*                        Learn*/}
            {/*                    </SuperButton>*/}
            {/*                </span>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
        </div>
    )
}