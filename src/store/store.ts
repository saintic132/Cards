import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import thunk from "redux-thunk";
import testReducer from "./reducers/test-reducer";

export type ActionsType = any
export type ReduxStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    test: testReducer
})

export const store: Store<ReduxStateType, ActionsType> = createStore(rootReducer, applyMiddleware(thunk))