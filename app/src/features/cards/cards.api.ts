import axios from "axios"
import { instance } from "common/api"

const cards = "cards/card"

const cardsApi = {
  getCard(queryParams: getCardRequest) {
    return instance.get<Cards>(cards, { params: { ...queryParams } })
  },
  createCard(data: NewCardRequestType) {
    return instance.post<NewCardResponse>(cards, { card: data })
  },
  deleteCard(queryCardId: QueryCardId) {
    return instance.delete(cards, {
      params: queryCardId,
    })
  },
  updateCards(updateData: UpdateCard) {
    return instance.put(cards, { card: updateData })
  },
  updateGradeCard(updateGradeData: UpdateCardGrade) {
    return instance.put<UpdateCardResponse>("cards/grade", { updatedGrade: updateGradeData })
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

type QueryCardId = Pick<Card, "_id">

type UpdateCard = Partial<Omit<NewCardRequestType, "cardsPack_id" | "grade">> & Pick<Card, "_id" | "question">

type UpdateCardGrade = Pick<Card, "grade"> & { gard_id: string }
type UpdateCardResponse = Omit<Card, "answer" | "question" | "created" | "updated"> & { gard_id: string }
