import { instance } from "common/api"
import {
  Cards,
  NewCardRequestType,
  NewCardResponse,
  QueryCardId,
  UpdateCard,
  UpdateCardGrade,
  UpdateCardResponse,
  getCardRequest,
} from "./cards.api.types"

const cards = "cards/card"

export const cardsApi = {
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
    return instance.put<UpdateCardResponse>("cards/grade", updateGradeData)
  },
}
