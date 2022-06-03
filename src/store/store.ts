import {applyMiddleware, combineReducers, Store, legacy_createStore as createStore} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ProfileActionsType, profileReducer} from "./reducers/profile-reducer";



export type ActionsType = ProfileActionsType
export type ReduxStateType = ReturnType<typeof rootReducer>
export type TypedDispatch = ThunkDispatch<ReduxStateType, any, ActionsType>


let rootReducer = combineReducers({
    profile: profileReducer,
})

export const store: Store<ReduxStateType, ActionsType> = createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxStateType> = useSelector



