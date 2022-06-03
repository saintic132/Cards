import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const userAPI = {
    editProfile(name: string, avatar?: string) {
        return instance.put<{ name: string, avatar?: string }, AxiosResponse<ResponseType<UpdatedUser>>>('/auth/me', {
            name,
            avatar
        })
    }
}

export const authAPI = {
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<ResponseType<UpdatedUser>>>(`/auth/login`, data)
    },
}

export type UpdatedUser = {
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
