import {TypedDispatch} from "../store";
import {User, userAPI} from "../../common/c1-API/API";
import {Dispatch} from "redux";

// types
export type InitialProfileStateType = {
    isLoggedIn: boolean
    _id: string
    email: string
    name: string
    avatar?: string | undefined
    publicCardPacksCount: number;
    created: Date | string
    updated: Date | string
    isAdmin: boolean;
    verified: boolean
    rememberMe: boolean
    editProfile: boolean
    disableButton: boolean
    errorMessage: null | string
    registerCompleted: boolean
}

const initialState = {
    isLoggedIn: false,
    _id: '',
    email: '',
    name: '',
    avatar: undefined,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    editProfile: false,
    disableButton: false,
    errorMessage: null,
    registerCompleted: false
}

export enum ACTIONS_PROFILE_TYPE {
    SET_IS_LOGGED_IN = 'LOGIN/SET_IS_LOGGED_IN',
    REGISTER_COMPLETED = 'REGISTRATION/REGISTER_COMPLETED',
    CHANGE_NICKNAME_PROFILE = 'PROFILE/CHANGE_NICKNAME_PROFILE',
    CHANGE_EDITMODE_PROFILE = 'PROFILE/CHANGE_EDITMODE_PROFILE',
    DISABLE_BUTTON = 'PROFILE/DISABLE_BUTTON',
    SET_ERROR_TO_PROFILE = 'PROFILE/SET_ERROR_TO_PROFILE',
}

export const profileReducer = (state: InitialProfileStateType = initialState, action: ProfileActionsType): InitialProfileStateType => {
    switch (action.type) {
        case ACTIONS_PROFILE_TYPE.SET_IS_LOGGED_IN: {
            return {...state, ...action.data, isLoggedIn: action.isLoggedIn}

        }
        case ACTIONS_PROFILE_TYPE.REGISTER_COMPLETED:
            return {...state, registerCompleted: action.register}
        case ACTIONS_PROFILE_TYPE.CHANGE_NICKNAME_PROFILE: {
            return {
                ...state,
                name: action.name,
                avatar: action.avatar
            }
        }
        case ACTIONS_PROFILE_TYPE.CHANGE_EDITMODE_PROFILE: {
            return {
                ...state, editProfile: action.editMode
            }
        }
        case ACTIONS_PROFILE_TYPE.DISABLE_BUTTON: {
            return {
                ...state,
                disableButton: action.disableButton
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_ERROR_TO_PROFILE: {
            return {
                ...state,
                errorMessage: action.error
            }
        }
        default:
            return state
    }
}
// actions
export const setLoggedInAC = (data: User, isLoggedIn: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.SET_IS_LOGGED_IN,
    data,
    isLoggedIn
} as const)
export const setRegistrationCompletedAC = (register: boolean) => {
    return {type: ACTIONS_PROFILE_TYPE.REGISTER_COMPLETED, register} as const
}
export const editProfileAC = (name: string, avatar?: string) => ({
    type: ACTIONS_PROFILE_TYPE.CHANGE_NICKNAME_PROFILE,
    name,
    avatar
} as const)
export const setEditProfileAC = (editMode: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.CHANGE_EDITMODE_PROFILE,
    editMode
} as const)
export const setDisableButtonAC = (disableButton: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.DISABLE_BUTTON,
    disableButton
} as const)
export const setErrorToProfileAC = (error: string | null) => ({
    type: ACTIONS_PROFILE_TYPE.SET_ERROR_TO_PROFILE,
    error
} as const)


//Types Actions
type LoginActionType = ReturnType<typeof setLoggedInAC>
type EditProfileType = ReturnType<typeof editProfileAC>
type SetEditProfileType = ReturnType<typeof setEditProfileAC>
type SetDisableButtonSaveButtonEditProfileType = ReturnType<typeof setDisableButtonAC>
type SetErrorToProfileType = ReturnType<typeof setErrorToProfileAC>
type SetRegistrationCompleteType = ReturnType<typeof setRegistrationCompletedAC>

export type ProfileActionsType =
    LoginActionType
    | SetRegistrationCompleteType
    | EditProfileType
    | SetEditProfileType
    | SetDisableButtonSaveButtonEditProfileType
    | SetErrorToProfileType

//Thunk
export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: TypedDispatch) => {
        userAPI.login(email, password, rememberMe)
            .then((res) => {
                dispatch(setLoggedInAC(res.data, true))
            })
            .catch(err => {
                if (err.response.data) {
                    dispatch(setErrorToProfileAC(err.response.data.error))
                } else {
                    dispatch(setErrorToProfileAC(err.message))
                }
            })
    }
}

export const registrNewUserTC = (email: string, password: string) => (dispatch: Dispatch) => {
    userAPI.registration(email, password)
        .then(res => {
            dispatch(setRegistrationCompletedAC(true))
        })
        .catch(err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        })
}

export const editProfileThunk = (name: string, avatar?: string) => (dispatch: TypedDispatch) => {
    dispatch(setDisableButtonAC(true))
    dispatch(setErrorToProfileAC(null))
    userAPI.editProfile(name, avatar)
        .then(res => {
            if (res.status >= 200 && res.status < 400) {
                dispatch(editProfileAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
                dispatch(setEditProfileAC(false))
            }
        })
        .catch(err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        })
        .finally(() => {
            dispatch(setDisableButtonAC(false))
        })
}