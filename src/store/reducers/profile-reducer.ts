import {TypedDispatch} from "../store";
import {userAPI} from "../../common/API/API";

export enum ACTIONS_PROFILE_TYPE {
    CHANGE_NICKNAME_PROFILE = 'PROFILE/CHANGE_NICKNAME_PROFILE',
    CHANGE_EDITMODE_PROFILE = 'PROFILE/CHANGE_EDITMODE_PROFILE',
    DISABLE_SAVEBUTTON_PROFILE = 'PROFILE/DISABLE_SAVEBUTTON_PROFILE',
    SET_ERROR_TO_PROFILE = 'PROFILE/SET_ERROR_TO_PROFILE',
}

type InitialProfileStateType = {
    name: string
    email: string
    avatar: string | undefined
    editProfile: boolean
    disableButton: boolean
    errorMessage: null | string
}
let initialProfileState: InitialProfileStateType = {
    name: '123@gaga.ru',
    email: "123@gaga.ru",
    avatar: undefined,
    editProfile: false,
    disableButton: false,
    errorMessage: null
}

const profileReducer = (state: InitialProfileStateType = initialProfileState, action: ProfileActionsType): InitialProfileStateType => {
    switch (action.type) {
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
        case ACTIONS_PROFILE_TYPE.DISABLE_SAVEBUTTON_PROFILE: {
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

//Actions
export const editProfileAC = (name: string, avatar?: string) => ({
    type: ACTIONS_PROFILE_TYPE.CHANGE_NICKNAME_PROFILE,
    name,
    avatar
} as const)
export const setEditProfileAC = (editMode: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.CHANGE_EDITMODE_PROFILE,
    editMode
} as const)
export const setDisableButtonSaveButtonEditProfileAC = (disableButton: boolean) => ({
    type: ACTIONS_PROFILE_TYPE.DISABLE_SAVEBUTTON_PROFILE,
    disableButton
} as const)
export const setErrorToProfileAC = (error: string | null) => ({
    type: ACTIONS_PROFILE_TYPE.SET_ERROR_TO_PROFILE,
    error
} as const)

//Types Actions
type EditProfileType = ReturnType<typeof editProfileAC>
type SetEditProfileType = ReturnType<typeof setEditProfileAC>
type SetDisableButtonSaveButtonEditProfileType = ReturnType<typeof setDisableButtonSaveButtonEditProfileAC>
type SetErrorToProfileType = ReturnType<typeof setErrorToProfileAC>

export type ProfileActionsType =
    EditProfileType
    | SetEditProfileType
    | SetDisableButtonSaveButtonEditProfileType
    | SetErrorToProfileType


//Thunk
export const editProfileThunk = (name: string, avatar?: string) => (dispatch: TypedDispatch) => {
    dispatch(setDisableButtonSaveButtonEditProfileAC(true))
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
            dispatch(setDisableButtonSaveButtonEditProfileAC(false))
        })
}


export default profileReducer