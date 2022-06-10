import React, {memo} from 'react';
import style from './PacksCardsFilter.module.css'

type PacksCardsFilterType = {
    activePage: string
    setActive: (value: 'all' | 'my') => void
}

export const PacksCardsFilter = memo(({activePage, setActive}: PacksCardsFilterType) => {

    return (
        <div className={style.packsCardsFilter__container}>
            <div className={style.packsCardsFilter__body}>
                <h4>Show packs cards</h4>
                <div className={style.packsCardsFilter__buttons}>
                    <div
                        className={activePage === 'my' ? style.packsCardsFilter__active_field : style.packsCardsFilter__not_active_field}
                        onClick={() => setActive('my')}
                    >
                        My
                    </div>
                    <div
                        className={activePage === 'all' ? style.packsCardsFilter__active_field : style.packsCardsFilter__not_active_field}
                        onClick={() => setActive('all')}
                    >
                        All
                    </div>
                </div>
            </div>
        </div>
    )
})