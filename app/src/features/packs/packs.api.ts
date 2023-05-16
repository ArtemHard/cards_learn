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
  getPacks: () => {
    return instance.get<FetchPacksResponseType>("cards/pack")
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
