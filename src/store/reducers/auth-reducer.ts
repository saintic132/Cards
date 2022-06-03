import {TypedDispatch} from "../store";
import {authAPI, LoginType, UpdatedUser} from "../../common/API/API";

const initialState = {
    isLoggedIn: false,
    _id: null,
    email: null,
    name: null,
    avatar: undefined,
    publicCardPacksCount: 0,
    created: null,
    updated: null,
    isAdmin: false,
    verified: false,
    rememberMe: false
}

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, ...action.data, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// types
type InitialStateType = {
    isLoggedIn: boolean
    _id: string | null
    email: string | null
    name: string | null
    avatar?: string | undefined
    publicCardPacksCount: number;
    created: Date | null;
    updated: Date | null;
    isAdmin: boolean;
    verified: boolean
    rememberMe: boolean
}
export type LoginActionType = ReturnType<typeof setLoggedInAC>

// actions
const setLoggedInAC = (data: UpdatedUser, isLoggedIn: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    data,
    isLoggedIn
} as const)

// thunks
export const loginTC = (data: LoginType) => {
    return (dispatch: TypedDispatch) => {
        authAPI.login(data)
            .then((res) => {
                dispatch(setLoggedInAC(res.data.updatedUser, true))
            })
            .catch((error) => {
                alert(error)
            })
    }
}




