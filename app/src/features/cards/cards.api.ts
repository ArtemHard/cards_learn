import axios from "axios"
import { instance } from "common/api"

const cards = "cards/"

const cardsApi = {
  getCard(queryParams: getCardRequest) {
    return instance.get<Cards>(cards + "cards", { params: { ...queryParams } })
  },
  createCard(data: NewCardRequestType) {
    return instance.post<NewCardResponse>(cards + "cards", data)
  },
}

type Cards = {
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

interface Card {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

//   ?cardAnswer=english // не обязательно
//   &cardQuestion=english // не обязательно
//   &cardsPack_id=5eb6a2f72f849402d46c6ac7
//   &min=1 // не обязательно
//   &max=4 // не обязательно
//   &sortCards=0grade // не обязательно
//   &page=1 // не обязательно
//   &pageCount=7 // не обязательно
type getCardRequest = {
  cardAnswer?: string // не обязательно
  cardQuestion?: string // не обязательно
  cardsPack_id: string
  min?: number // не обязательно
  max?: number // не обязательно
  sortCards?: string // не обязательно
  page?: 1 // не обязательно
  pageCount?: 7 // не обязательно
}

type NewCardResponse = {
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

type NewCardRequestType = Partial<Pick<Card, "question" | "answer" | "grade" | "shots">> & {
  cardsPack_id: string
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
