// Types
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type FetchPacksResponseType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CreatePackResponseType = {
  newCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type RemovePackResponseType = {
  deletedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type UpdatePackResponseType = {
  updatedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type ArgCreatePackType = {
  name?: string
  deckCover?: string
  private?: boolean
}
