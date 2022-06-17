import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./reducers/profile-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {PacksActionType, packsReducer} from "./reducers/pack-reducer";
import {CardsActionType, cardsReducer} from "./reducers/card-reducer";

const reducers = combineReducers({
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer
})

//@ts-ignore
export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>

export type ThunksDispatch = ThunkDispatch<AppStoreType, any, AppActionType>
export const useAppDispatch = () => useDispatch<ThunksDispatch>()


export type AppActionType = ProfileActionsType | PacksActionType | CardsActionType

// @ts-ignore
window.store = store