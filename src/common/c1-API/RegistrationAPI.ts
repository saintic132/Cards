import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const registrationAPI = {
    registration (email: string, password: string) {
        return instance.post<{email: string, password: string}, AxiosResponse<RegistrationResponseType>>('auth/register', {email, password})
    }
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