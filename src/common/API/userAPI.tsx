import {AxiosResponse} from "axios";
import {instance} from "./settingsAPI";

export const userAPI = {
    registration(email: string, password: string) {
        return instance.post<{ email: string, password: string }, AxiosResponse<RegistrationResponseType>>('auth/register', {
            email,
            password
        })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<{ email: string, password: string, rememberUser: boolean }, AxiosResponse<User>>(`/auth/login`, {
            email,
            password,
            rememberMe
        })
    },
    authMe() {
      return instance.post<null, AxiosResponse<RegistrationResponseType>>('/auth/me')
    },
    logout() {
        return instance.delete<null, AxiosResponse<{ info: string }>>('/auth/me')
    },
    forgotPassword(email: string) {
        return instance.post<{ email: string }, AxiosResponse<{ info: string }>>('/auth/forgot', {
            email,
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='https://saintic132.github.io/GlobalProject/#/set-new-password/$token$'>link</a></div>`
        })
    },
    setNewPassword(password: string, token: string) {
        return instance.post<{ password: string, token: string }, AxiosResponse<{ info: string }>>('/auth/set-new-password', {
            password,
            resetPasswordToken: token
        })
    },
    editProfile(name: string, avatar?: string) {
        return instance.put<{ name: string, avatar?: string }, AxiosResponse<ResponseType<User>>>('/auth/me', {
            name,
            avatar
        })
    },
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
export type User = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean
    rememberMe: boolean
}
type ResponseType<D = {}> = {
    token: string
    tokenDeathTime: number
    updatedUser: D
}
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}
