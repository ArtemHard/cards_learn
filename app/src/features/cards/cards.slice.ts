import { PayloadAction, createSlice } from "@reduxjs/toolkit"
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

const fetchCards = createAppAsyncThunk<{ cardsPage: Cards }, void>("cards/fetchCards", async (params, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { cardAnswer, cardQuestion, cardsPack_id, max, min, page, pageCount, sortCards } =
      thunkAPI.getState().cards.filterParams

    const filteredObj: Omit<getCardRequest, "cardsPack_id"> = Object.fromEntries(
      Object.entries({ cardAnswer, cardQuestion, max, min, page, pageCount, sortCards }).filter(
        ([key, value]) => !!value
      )
    )
    const res = await cardsApi.getCard({ cardsPack_id, ...filteredObj })
    return { cardsPage: res.data }
  })
})

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
type FilterParams = Partial<typeof initialState.filterParams>

const initialState = {
  cards: [] as Card[],
  packUserId: "" as string | null,
  packName: "" as string | null,
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
  filterParams: {
    cardAnswer: null as null | string, // не обязательно
    cardQuestion: null as null | string, // не обязательно
    cardsPack_id: "" as string,
    min: null as null | number, // не обязательно
    max: null as null | number, // не обязательно
    sortCards: null as null | string, //0grade, // не обязательно
    page: null as null | number, // не обязательно
    pageCount: null as null | number, // не обязательно
  },
}

const slice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    changeFilterParams: (state, action: PayloadAction<FilterParams>) => {
      state.filterParams = { ...state.filterParams, ...action.payload }
    },
    clearFilter: (state) => {
      state.filterParams = {
        ...initialState.filterParams,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        const newState = action.payload.cardsPage
        state.cards = newState.cards
        state.packUserId = newState.packUserId
        state.packName = newState.packName
        state.packPrivate = newState.packPrivate
        state.packDeckCover = newState.packDeckCover
        state.packCreated = newState.packCreated
        state.packUpdated = newState.packUpdated
        state.page = newState.page
        state.pageCount = newState.pageCount
        state.cardsTotalCount = newState.cardsTotalCount
        state.minGrade = newState.minGrade
        state.maxGrade = newState.maxGrade
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
