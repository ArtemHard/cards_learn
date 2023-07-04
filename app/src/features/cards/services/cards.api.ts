import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "common/api/common.api"
import { Cards, NewCardRequestType, NewCardResponse, getCardRequest } from "../cards.api.types"

export const cardsSliceApi = createApi({
  reducerPath: "cardsSliceApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),
  endpoints: (build) => {
    return {
      getCards: build.query<Cards, getCardRequest>({
        query: (query) => {
          return {
            method: "GET",
            url: "cards/card",
            params: query,
          }
        },
      }),
      addCard: build.mutation<NewCardResponse, NewCardRequestType>({
        query: (card) => {
          return {
            method: "POST",
            url: "cards/card",
            body: {
              card,
            },
          }
        },
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsSliceApi
