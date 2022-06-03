import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const userAPI = {
    editProfile(name: string, avatar?: string) {
        return instance.put<{ name: string, avatar?: string }, AxiosResponse<ResponseType<User>>>('/auth/me', {
            name,
            avatar
        })
    }
}

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<{email: string, password: string, rememberUser: boolean}, AxiosResponse<User>>(`/auth/login`, {email, password, rememberMe})
    },
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
