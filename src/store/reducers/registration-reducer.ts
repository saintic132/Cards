import {registrationAPI, RegistrationParamsType} from "../../common/API/RegistrationAPI";
import {Dispatch} from "redux";

//ACTIONS
export enum ACTIONS_REG_TYPE {
    DISABLE_REGBUTTON_REGISTRATION = 'REGISTRATION/DISABLE_REGBUTTON_REGISTRATION',
    ERROR_UNSAME_PASSWORD = 'REGISTRATION/ERROR_UNSAME_PASSWORD',
    SET_EMAIL = 'REGISTRATION/SET_EMAIL'
}

type RegistrationInitialStateType = {
    disableButton: boolean
    errorUnsame: null | string
    email: null | string
    registerCompleted: boolean
}

const initialState: RegistrationInitialStateType = {
    disableButton: false,
    errorUnsame: null,
    email: null,
    registerCompleted : false
}


export const registrationReducer = (state = initialState,
                             action: RegistrationActionsType): RegistrationInitialStateType => {
    switch (action.type) {
        case ACTIONS_REG_TYPE.DISABLE_REGBUTTON_REGISTRATION:
            return {...state, disableButton: action.disableButton}
        case ACTIONS_REG_TYPE.ERROR_UNSAME_PASSWORD:
            return {...state, errorUnsame: action.errorUnsame}
        case ACTIONS_REG_TYPE.SET_EMAIL:
            return {...state, registerCompleted: action.register}
        default:
            return state

    }
}

export const disableButtonRegisterAC = (disableButton: boolean) => {
    return {type: ACTIONS_REG_TYPE.DISABLE_REGBUTTON_REGISTRATION, disableButton} as const
}
export const errorUnsamePasswordAC = (errorUnsame: null | string) => {
    return {type: ACTIONS_REG_TYPE.ERROR_UNSAME_PASSWORD, errorUnsame} as const
}
export const setRegisterAC = (register: boolean) => {
    return {type: ACTIONS_REG_TYPE.SET_EMAIL, register} as const
}

//TYPE ACTIONS
type DisButtonRegType = ReturnType<typeof disableButtonRegisterAC>
type ErrUnsamePassType = ReturnType<typeof errorUnsamePasswordAC>
type SetEmailType = ReturnType<typeof setRegisterAC>


export type RegistrationActionsType =
    DisButtonRegType
    | ErrUnsamePassType
    | SetEmailType

//THUNK
export const registrationTC = (data: RegistrationParamsType) => (dispatch: Dispatch) => {
    registrationAPI.registration(data)
        .then(res => {
            dispatch(setRegisterAC(true))
            // console.log('мыло из санки' + data.email)
            // setEmailAC(data.email)
        })
        .catch(e => {
            dispatch(errorUnsamePasswordAC(e.response.data.error))
        })
}