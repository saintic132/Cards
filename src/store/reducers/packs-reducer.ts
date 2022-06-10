import {ReduxStateType, TypedDispatch} from "../store";
import {packsList} from "../../common/API/packsAPI";

export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    user_name: string
    updated: string
}

export type InitialPacksStateType = {
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

const initialPacksState: InitialPacksStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    sortPacks: '0updated',
    searchText: '',
    activeUserPacks: 'userPacks'
}

export enum ACTIONS_PROFILE_TYPE {
    SET_PACKS = 'PACKS/SET_PACKS',
    SET_MIN_CARDS_FILTER_VALUE = 'PACKS/SET_MIN_CARDS_FILTER_VALUE',
    SET_MAX_CARDS_FILTER_VALUE = 'PACKS/SET_MAX_CARDS_FILTER_VALUE',
    SET_SEARCH_PACKS_VALUE = 'PACKS/SET_SEARCH_PACKS_VALUE',
    SET_ACTIVE_USER_PACKS_ONLY = 'PACKS/SET_ACTIVE_USER_PACKS_ONLY',
}

export const packsReducer = (state: InitialPacksStateType = initialPacksState, action: PacksActionsType): InitialPacksStateType => {
    switch (action.type) {
        case ACTIONS_PROFILE_TYPE.SET_PACKS: {
            return {
                ...state,
                cardPacks: [...action.packs],
                cardPacksTotalCount: action.cardPacksTotalCount,
                page: action.page,
                pageCount: action.selectPageCount
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_MIN_CARDS_FILTER_VALUE: {
            return {
                ...state,
                minCardsCount: action.value
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_MAX_CARDS_FILTER_VALUE: {
            return {
                ...state,
                maxCardsCount: action.value
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_SEARCH_PACKS_VALUE: {
            return {
                ...state,
                searchText: action.value
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_ACTIVE_USER_PACKS_ONLY: {
            return {
                ...state,
                activeUserPacks: action.activePacks
            }
        }
        default:
            return state
    }
}

// actions
export const setPacksAC = (packs: CardPacksType[], cardPacksTotalCount: number, page: number, selectPageCount: number) =>
    ({type: ACTIONS_PROFILE_TYPE.SET_PACKS, packs, cardPacksTotalCount, page, selectPageCount} as const)
export const setMinCardsFilterValueAC = (value: number) =>
    ({type: ACTIONS_PROFILE_TYPE.SET_MIN_CARDS_FILTER_VALUE, value} as const)
export const setMaxCardsFilterValueAC = (value: number) =>
    ({type: ACTIONS_PROFILE_TYPE.SET_MAX_CARDS_FILTER_VALUE, value} as const)
export const setSearchPacksValueAC = (value: string) =>
    ({type: ACTIONS_PROFILE_TYPE.SET_SEARCH_PACKS_VALUE, value} as const)
export const setActiveUserPacksOnlyAC = (activePacks: 'allPacks' | 'userPacks') =>
    ({type: ACTIONS_PROFILE_TYPE.SET_ACTIVE_USER_PACKS_ONLY, activePacks} as const)

//Types Actions

type SetPacksType = ReturnType<typeof setPacksAC>
type SetMinCardsFilterValueType = ReturnType<typeof setMinCardsFilterValueAC>
type SetMaxCardsFilterValueType = ReturnType<typeof setMaxCardsFilterValueAC>
type SetSearchPacksValueType = ReturnType<typeof setSearchPacksValueAC>
type SetActiveUserPacksOnlyType = ReturnType<typeof setActiveUserPacksOnlyAC>
export type PacksActionsType = SetPacksType | SetMinCardsFilterValueType | SetMaxCardsFilterValueType | SetSearchPacksValueType | SetActiveUserPacksOnlyType

//Thunk

export const getPacksTC = (packName: string, sortPacks: string, page: number, selectPageCount: number) => (dispatch: TypedDispatch, getState: () => ReduxStateType) => {
    const {minCardsCount, maxCardsCount} = getState().packs
    const {_id} = getState().profile
    packsList.getPacks(packName, minCardsCount, maxCardsCount, sortPacks, page, selectPageCount, _id)
        .then(res => {
            dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount, page, selectPageCount))
        })

}

