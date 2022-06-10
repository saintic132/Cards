import {TypedDispatch} from "../store";
import {User, userAPI} from "../../common/API/userAPI";
import {Dispatch} from "redux";

//fakeUserWhenLogout
export type FakeUserStateType = {
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
}

const fakeUser = {
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
}

// types
export type InitialProfileStateType = FakeUserStateType & {
    helpers: {
        isLoggedIn: boolean
        initializedContent: boolean
        editProfile: boolean
        disableButton: boolean
        errorMessage: null | string
        registerCompleted: boolean
        sendMessageToEmail: boolean
        tempEmailToRecover: string | null
        newPassSet: boolean
    }
}

const initialState = {
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
    helpers: {
        isLoggedIn: false,
        initializedContent: false,
        editProfile: false,
        disableButton: false,
        errorMessage: null,
        registerCompleted: false,
        sendMessageToEmail: false,
        tempEmailToRecover: null,
        newPassSet: false
    }
}


export enum ACTIONS_PROFILE_TYPE {
    SET_IS_LOGGED_IN = 'LOGIN/SET_IS_LOGGED_IN',
    SET_INITIALIZED_CONTENT = 'PROFILE/SET_INITIALIZED_CONTENT',
    REGISTER_COMPLETED = 'REGISTRATION/REGISTER_COMPLETED',
    FORGOT_PASSWORD = 'PASSWORD/FORGOT_PASSWORD',
    SEND_NEW_PASSWORD = 'PASSWORD/SEND_NEW_PASSWORD',
    CHANGE_NICKNAME_PROFILE = 'PROFILE/CHANGE_NICKNAME_PROFILE',
    CHANGE_EDITMODE_PROFILE = 'PROFILE/CHANGE_EDITMODE_PROFILE',
    DISABLE_BUTTON = 'PROFILE/DISABLE_BUTTON',
    SET_ERROR_TO_PROFILE = 'PROFILE/SET_ERROR_TO_PROFILE',
}

export const profileReducer = (state: InitialProfileStateType = initialState, action: ProfileActionsType): InitialProfileStateType => {
    switch (action.type) {
        case ACTIONS_PROFILE_TYPE.SET_IS_LOGGED_IN: {
            return {
                ...state,
                ...action.data,
                helpers: {
                    ...state.helpers,
                    isLoggedIn: action.isLoggedIn
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.REGISTER_COMPLETED: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    registerCompleted: action.register
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.FORGOT_PASSWORD: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    sendMessageToEmail: action.sendMessageToEmail,
                    tempEmailToRecover: action.email
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.SEND_NEW_PASSWORD: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    newPassSet: action.completed
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.CHANGE_NICKNAME_PROFILE: {
            return {
                ...state,
                name: action.name,
                avatar: action.avatar
            }
        }
        case ACTIONS_PROFILE_TYPE.CHANGE_EDITMODE_PROFILE: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    editProfile: action.editMode
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.DISABLE_BUTTON: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    disableButton: action.disableButton
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_ERROR_TO_PROFILE: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    errorMessage: action.error
                }
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_INITIALIZED_CONTENT: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    initializedContent: true
                }
            }
        }
        default:
            return state
    }
}
// actions
export const setLoggedInAC = (data: User | FakeUserStateType, isLoggedIn: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.SET_IS_LOGGED_IN,
    data,
    isLoggedIn
} as const)
export const setRegistrationCompletedAC = (register: boolean) => {
    return {type: ACTIONS_PROFILE_TYPE.REGISTER_COMPLETED, register} as const
}
export const sendEmailToRecoverPasswordAC = (sendMessageToEmail: boolean, email: string| null) => {
    return {type: ACTIONS_PROFILE_TYPE.FORGOT_PASSWORD, sendMessageToEmail, email} as const
}
export const setNewPasswordAC = (completed: boolean) => {
    return {type: ACTIONS_PROFILE_TYPE.SEND_NEW_PASSWORD, completed} as const
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
export const setInitializedContentAC = () => ({type: ACTIONS_PROFILE_TYPE.SET_INITIALIZED_CONTENT} as const)



//Types Actions
type LoginActionType = ReturnType<typeof setLoggedInAC>
type EditProfileType = ReturnType<typeof editProfileAC>
type SetEditProfileType = ReturnType<typeof setEditProfileAC>
type SetDisableButtonSaveButtonEditProfileType = ReturnType<typeof setDisableButtonAC>
type SetErrorToProfileType = ReturnType<typeof setErrorToProfileAC>
type SetRegistrationCompleteType = ReturnType<typeof setRegistrationCompletedAC>
type SendEmailToRecoverPasswordType = ReturnType<typeof sendEmailToRecoverPasswordAC>
type SetNewPasswordType = ReturnType<typeof setNewPasswordAC>
type SetInitializedContentType = ReturnType<typeof setInitializedContentAC>

export type ProfileActionsType =
    LoginActionType
    | SetRegistrationCompleteType
    | SendEmailToRecoverPasswordType
    | SetNewPasswordType
    | EditProfileType
    | SetEditProfileType
    | SetDisableButtonSaveButtonEditProfileType
    | SetErrorToProfileType
| SetInitializedContentType

//Thunk
export const registrNewUserTC = (email: string, password: string) => (dispatch: Dispatch) => {
    userAPI.registration(email, password)
        .then(res => {
            if (res.status >= 200 && res.status < 400) {
                dispatch(setRegistrationCompletedAC(true))
            }
        })
        .catch(err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        })
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setDisableButtonAC(true))
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
            .finally(() => {
                dispatch(setDisableButtonAC(false))
            })
    }
}

export const isAuthUser = () => {
    return (dispatch: TypedDispatch) => {
        userAPI.authMe()
            .then((res) => {
                dispatch(setLoggedInAC(res.data, true))
            })
            .finally(() => {
                dispatch(setInitializedContentAC())
            })
    }
}

export const logoutTC = () => {
    return (dispatch: TypedDispatch) => {
        dispatch(setDisableButtonAC(true))
        userAPI.logout()
            .then((res) => {
                if (res.status >= 200 && res.status < 400) {
                    dispatch(setLoggedInAC(fakeUser, false))
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
}

export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(setDisableButtonAC(true))
    userAPI.forgotPassword(email)
        .then(res => {
            if (res.status >= 200 && res.status < 400) {
                dispatch(sendEmailToRecoverPasswordAC(true, email))
                dispatch(setDisableButtonAC(false))
            }
        })
        .catch((err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        }))
        .finally(() => {
            dispatch(setDisableButtonAC(false))
        })
}

export const sendNewPasswordTC = (password: string, token: string) => (dispatch: Dispatch) => {
    dispatch(setDisableButtonAC(true))
    userAPI.setNewPassword(password, token)
        .then(res => {
            if (res.status >= 200 && res.status < 400) {

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