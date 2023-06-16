import { instance } from "common/api/common.api"
import {
  ArgCreatePackType,
  CreatePackResponseType,
  FetchPacksResponseType,
  PackType,
  RemovePackResponseType,
  UpdatePackResponseType,
} from "./packs.api.types"

export const packsApi = {
  getPacks: (paramsData?: GetParamsType) => {
    return instance.get<FetchPacksResponseType>("cards/pack", {
      params: {
        ...paramsData,
      },
    })
  },
  createPack: (cardsPack: ArgCreatePackType) => {
    return instance.post<CreatePackResponseType>("cards/pack", { cardsPack })
  },
  removePack: (id: string) => {
    return instance.delete<RemovePackResponseType>(`cards/pack?id=${id}`)
  },
  updatePack: (cardsPack: PackType) => {
    return instance.put<UpdatePackResponseType>("cards/pack", { cardsPack })
  },
}

export type GetParamsType = {
  packName?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  sortPacks?: string // не обязательно //WARNING-QUESTION &sortPacks=0updated => Если харкор параметр в виде стринги то какие ещё варианты
  page?: number // не обязательно
  pageCount?: number // не обязательно
  user_id?: string
  // чьи колоды не обязательно, или придут все
  block?: boolean // не обязательно
}
