export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    user_name: string
    updated: string
}

export type InitialCardsStateType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    sortPacks: string
    searchText: string
    activeUserPacks: 'userPacks' | 'allPacks'
}

const initialCardsState: InitialCardsStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    sortPacks: '0updated',
    searchText: '',
    activeUserPacks: 'allPacks'
}

export enum ACTIONS_PROFILE_TYPE {
    SET_ACTIVE_USER_PACKS_ONLY = 'PACKS/SET_ACTIVE_USER_PACKS_ONLY',
}

export const cardsReducer = (state: InitialCardsStateType = initialCardsState, action: CardsActionsType): InitialCardsStateType => {
    switch (action.type) {

        default:
            return state
    }
}

// actions
// export const setPacksAC = (packs: CardPacksType[], cardPacksTotalCount: number, page: number, selectPageCount: number) =>
//     ({type: ACTIONS_PROFILE_TYPE.SET_PACKS, packs, cardPacksTotalCount, page, selectPageCount} as const)

//Types Actions


export type CardsActionsType = any

//Thunk


