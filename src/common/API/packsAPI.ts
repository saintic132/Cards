import {instance} from "./settingsAPI";
import {AxiosResponse} from "axios";
import {CardPacksType} from "../../store/reducers/packs-reducer";

export const packsList = {
    getPacks(packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, user_id?: string) {
        return instance.get<{}, AxiosResponse<ResponseGetPacksType<CardPacksType[]>>>('/cards/pack', {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id
            }
        })
    },
    addNewPack() {
        return instance.post<{}, AxiosResponse<ResponseType<PostPackData>>>('/cards/pack', {cardsPack: {name: 'new pack'}})
    }
}

type ResponseGetPacksType<D = []> = {
    cardPacks: D
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type PostPackData = {
    cardsCount: 0
    name: "new pack"
    private: false
    rating: 0
    updated: "2022-06-10T16:50:52.658Z"
    user_id: "629a21c569dccc00047b77ec"
    user_name: "123123123"
    _id: "62a3766c29e6a80004dad219"
}

type ResponseType<D = {}> = {
    token: string
    tokenDeathTime: number
    newCardsPack: D
}