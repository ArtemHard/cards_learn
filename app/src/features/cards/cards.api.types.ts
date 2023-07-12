export type Cards = {
  cards: Card[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export interface Card {
  answer: string | "no answer"
  question: string | "no question"
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type getCardRequest = {
  cardAnswer?: string // не обязательно
  cardQuestion?: string // не обязательно
  cardsPack_id: string
  min?: number // не обязательно
  max?: number // не обязательно
  sortCards?: string // не обязательно
  page?: 1 // не обязательно
  pageCount?: 7 // не обязательно
}

export type NewCardResponse = {
  newCard: NewCardRes
  token: string
  tokenDeathTime: number
}

interface NewCardRes extends Card {
  questionImg?: string
  answerImg?: string
  answerVideo?: string
  questionVideo?: string
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type NewCardRequestType = Partial<Pick<Card, "question" | "answer" | "grade" | "shots">> & {
  cardsPack_id: string
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type QueryCardId = { id: string }

export type UpdateCard = Partial<Omit<NewCardRequestType, "cardsPack_id" | "grade">> & Pick<Card, "_id" | "question">

export type UpdateCardGrade = Pick<Card, "grade"> & { card_id: string }
export type UpdateCardResponse = {
  updatedGrade: Omit<Card, "answer" | "question"> & { card_id: string }
}
