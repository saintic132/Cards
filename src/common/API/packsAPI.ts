import {instance} from "./settingsAPI";
import {AxiosResponse} from "axios";
import {CardPacksType} from "../../store/reducers/packs-reducer";

export const packsList = {
    getPacks(packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, user_id?: string) {
        return instance.get<{}, AxiosResponse<ResponseType<CardPacksType[]>>>('/cards/pack', {
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
    }
}

type ResponseType<D = []> = {
    cardPacks: D
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}