import { createSlice } from "@reduxjs/toolkit"
import {
  Card,
  Cards,
  NewCardRequestType,
  NewCardResponse,
  QueryCardId,
  UpdateCard,
  UpdateCardGrade,
  UpdateCardResponse,
  getCardRequest,
} from "./cards.api.types"
import { createAppAsyncThunk, thunkTryCatch } from "common/utils"
import { cardsApi } from "./cards.api"

const fetchCards = createAppAsyncThunk<{ cardsPage: Cards }, getCardRequest>(
  "cards/fetchCards",
  async (params, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.getCard(params)
      return { cardsPage: res.data }
    })
  }
)

const createCard = createAppAsyncThunk<{ card: NewCardResponse }, NewCardRequestType>(
  "cards/createCard",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.createCard(arg)
      return { card: res.data }
    })
  }
)

const deleteCard = createAppAsyncThunk<void, QueryCardId>("cards/deleteCard", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.deleteCard(arg)
    return { card: res.data }
  })
})

const updateCard = createAppAsyncThunk<void, UpdateCard>("cards/updateCard", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.updateCards(arg)
    return { card: res.data }
  })
})

const updateGradeCard = createAppAsyncThunk<{ card: UpdateCardResponse }, UpdateCardGrade>(
  "cards/updateGradeCard",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.updateGradeCard(arg)
      return { card: res.data }
    })
  }
)

const slice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as Card[],
    packUserId: "" as string | null,
    packName: "123" as string | null,
    packPrivate: false as boolean | null,
    packDeckCover: "" as string | null,
    packCreated: "" as string | null,
    packUpdated: "" as string | null,
    page: null as number | null,
    pageCount: null as number | null,
    cardsTotalCount: null as number | null,
    minGrade: null as number | null,
    maxGrade: null as number | null,
    token: "" as string | null,
    tokenDeathTime: null as number | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state = action.payload.cardsPage
      })
      .addCase(updateGradeCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((card) => card._id === action.payload.card._id)
        if (index !== -1) state.cards[index] = { ...state.cards[index], ...action.payload.card }
      })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = {
  fetchCards,
  createCard,
  deleteCard,
  updateCard,
  updateGradeCard,
}
