//fakeUserWhenLogout
import {NewUserType, User, userAPI} from "../api";
import {ThunksDispatch} from "../store";

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

const fakeUser: FakeUserStateType = {
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
        disableButton: boolean
        errorMessage: null | string
        registerCompleted: boolean
        sendMessageToEmail: boolean
        tempEmailToRecover: string | null
        loadingStatus: boolean
        newPassSet: boolean
    }
}

const initialState: InitialProfileStateType = {
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
        disableButton: false,
        errorMessage: null,
        registerCompleted: false,
        sendMessageToEmail: false,
        tempEmailToRecover: null,
        loadingStatus: false,
        newPassSet: false,
    }
}


export enum ACTIONS_PROFILE_TYPE {
    SET_IS_LOGGED_IN = 'LOGIN/SET_IS_LOGGED_IN',
    SET_NEW_NAME_AVATAR = 'LOGIN/SET_NEW_NAME_AVATAR',
    SET_NEW_NAME = 'LOGIN/SET_NEW_NAME',
    REGISTER_COMPLETED = 'REGISTRATION/REGISTER_COMPLETED',
    FORGOT_PASSWORD = 'PASSWORD/FORGOT_PASSWORD',
    SEND_NEW_PASSWORD = 'PASSWORD/SEND_NEW_PASSWORD',
    DISABLE_BUTTON = 'PROFILE/DISABLE_BUTTON',
    SET_ERROR_TO_PROFILE = 'PROFILE/SET_ERROR_TO_PROFILE',
    SET_INITIALIZED_CONTENT = 'PROFILE/SET_INITIALIZED_CONTENT',
    SET_LOADING_PAGE = 'PROFILE/SET_LOADING_PAGE',
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
        case ACTIONS_PROFILE_TYPE.SET_NEW_NAME: {
            return {
                ...state,
                name: action.name
            }
        }
        case ACTIONS_PROFILE_TYPE.SET_NEW_NAME_AVATAR: {
            return {
                ...state,
                ...action.info
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
        case ACTIONS_PROFILE_TYPE.SET_LOADING_PAGE: {
            return {
                ...state,
                helpers: {
                    ...state.helpers,
                    loadingStatus: action.loading
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
export const sendEmailToRecoverPasswordAC = (sendMessageToEmail: boolean, email: string | null) => {
    return {type: ACTIONS_PROFILE_TYPE.FORGOT_PASSWORD, sendMessageToEmail, email} as const
}
export const setNewPasswordAC = (completed: boolean) => {
    return {type: ACTIONS_PROFILE_TYPE.SEND_NEW_PASSWORD, completed} as const
}
export const setDisableButtonAC = (disableButton: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.DISABLE_BUTTON,
    disableButton
} as const)
export const setErrorToProfileAC = (error: string | null) => ({
    type: ACTIONS_PROFILE_TYPE.SET_ERROR_TO_PROFILE,
    error
} as const)
export const setLoadingStatusAC = (loading: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.SET_LOADING_PAGE,
    loading
} as const)
export const setInitializedContentAC = () => ({type: ACTIONS_PROFILE_TYPE.SET_INITIALIZED_CONTENT} as const)
export const setUserInfoAC = (info: User) => ({type: ACTIONS_PROFILE_TYPE.SET_NEW_NAME_AVATAR, info} as const)
export const changeUserNameInfoAC = (name: string) => ({type: ACTIONS_PROFILE_TYPE.SET_NEW_NAME, name} as const)


//Types Actions
type LoginActionType = ReturnType<typeof setLoggedInAC>
type SetDisableButtonSaveButtonEditProfileType = ReturnType<typeof setDisableButtonAC>
type SetErrorToProfileType = ReturnType<typeof setErrorToProfileAC>
type SetRegistrationCompleteType = ReturnType<typeof setRegistrationCompletedAC>
type SendEmailToRecoverPasswordType = ReturnType<typeof sendEmailToRecoverPasswordAC>
type SetNewPasswordType = ReturnType<typeof setNewPasswordAC>
type SetInitializedContentType = ReturnType<typeof setInitializedContentAC>
type SetLoadingStatusType = ReturnType<typeof setLoadingStatusAC>
type SetUserInfoType = ReturnType<typeof setUserInfoAC>
type ChangeUserNameInfoType = ReturnType<typeof changeUserNameInfoAC>

export type ProfileActionsType =
    LoginActionType
    | SetRegistrationCompleteType
    | SendEmailToRecoverPasswordType
    | SetNewPasswordType
    | SetDisableButtonSaveButtonEditProfileType
    | SetErrorToProfileType
    | SetInitializedContentType
    | SetLoadingStatusType
    | SetUserInfoType
    | ChangeUserNameInfoType

//Thunk
export const registrationNewUserTC = (data: NewUserType) => (dispatch: ThunksDispatch) => {
    dispatch(setLoadingStatusAC(true))
    userAPI.regisration(data)
        .then(() => {
            dispatch(setRegistrationCompletedAC(true))
        })
        .catch(err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        })
        .finally(() => {
            dispatch(setLoadingStatusAC(false))
        })
}

export const loginTC = (data: NewUserType) => {
    return (dispatch: ThunksDispatch) => {
        dispatch(setDisableButtonAC(true))
        dispatch(setLoadingStatusAC(true))
        userAPI.login(data)
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
                dispatch(setLoadingStatusAC(false))
            })
    }
}

export const isAuthUser = () => (dispatch: ThunksDispatch) => {
    dispatch(setLoadingStatusAC(true))
    userAPI.checkAuth()
        .then(res => {
            dispatch(setLoggedInAC(res.data, true))
        })
        .finally(() => {
            dispatch(setInitializedContentAC())
            dispatch(setLoadingStatusAC(false))
        })
}

export const logoutTC = () => (dispatch: ThunksDispatch) => {
    dispatch(setDisableButtonAC(true))
    dispatch(setLoadingStatusAC(true))
    userAPI.logout()
        .then(() => {
            dispatch(setLoggedInAC(fakeUser, false))
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
            dispatch(setLoadingStatusAC(false))
        })
}

export const forgotPasswordTC = (email: string) => (dispatch: ThunksDispatch) => {
    dispatch(setDisableButtonAC(true))
    dispatch(setLoadingStatusAC(true))
    userAPI.forgotPassword(email)
        .then(() => {
            dispatch(sendEmailToRecoverPasswordAC(true, email))
            dispatch(setDisableButtonAC(false))
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
            dispatch(setLoadingStatusAC(false))
        })
}

export const sendNewPasswordTC = (password: string, token: string) => (dispatch: ThunksDispatch) => {
    dispatch(setDisableButtonAC(true))
    dispatch(setLoadingStatusAC(true))
    userAPI.setNewPassword(password, token)
        .then(() => {
            dispatch(setNewPasswordAC(true))
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
            dispatch(setLoadingStatusAC(false))
        })
}

export const changeUserNameTC = (data: { name?: string, avatar?: string }) => (dispatch: ThunksDispatch) => {
    userAPI.changeUserData(data)
        .then(res => {
            dispatch(setUserInfoAC(res.data.updatedUser))
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
            dispatch(setLoadingStatusAC(false))
        })
}