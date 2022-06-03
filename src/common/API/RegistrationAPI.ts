import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const registrationAPI = {
    registration (data: RegistrationParamsType) {
        return instance.post<{data: RegistrationParamsType}, AxiosResponse<RegistrationResponseType>>('auth/register', data)
    }
}

export type RegistrationParamsType = {
    email: string
    password: string
}
export type RegistrationResponseType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}