import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, thunkTryCatch } from "common/utils"
import {
  ArgCreatePackType,
  CreatePackResponseType,
  FetchPacksResponseType,
  PackType,
} from "features/packs/packs.api.types"
import { GetParamsType, packsApi } from "./packs.api"

const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType }, void>(
  "packs/fetchPacks",
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const state = thunkAPI.getState().packs
      const dataForServer = {
        packName: state.packName, // не обязательно
        min: state.minCardsCount, // не обязательно
        max: state.maxCardsCount, // не обязательно
        sortPacks: state.sortPacks, // не обязательно //WARNING-QUESTION &sortPacks=0updated => Если харкор параметр в виде стринги то какие ещё варианты
        page: state.page, // не обязательно
        pageCount: state.pageCount, // не обязательно
        user_id: state.user_id,
        // чьи колоды не обязательно, или придут все
        block: state.block, // не обязательно
      }
      const filteredObj: GetParamsType = Object.fromEntries(
        Object.entries(dataForServer).filter(([key, value]) => !!value)
      )

      const res = await packsApi.getPacks(filteredObj)
      return { packsPage: res.data }
    })
  }
)

const createPack = createAppAsyncThunk<{ pack: PackType }, ArgCreatePackType>(
  "packs/createPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.createPack(arg)
      return { pack: res.data.newCardsPack }
      //   dispatch(fetchPacks())
    })
  }
)

const removePack = createAppAsyncThunk<{ packId: string }, string>("packs/removePack", async (id, thunkAPI) => {
  // const { dispatch } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.removePack(id)
    return { packId: res.data.deletedCardsPack._id }
    //   dispatch(fetchPacks())
  })
})

const updatePack = createAppAsyncThunk<{ pack: PackType }, PackType>("packs/updatePack", async (arg, thunkAPI) => {
  // const { dispatch } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.updatePack(arg)
    //   dispatch(fetchPacks())
    return { packs: res.data.updatedCardsPack }
  })
})

// type GetParamsType = {
//   packName?: string // не обязательно
//   min?: number // не обязательно
//   max?: number // не обязательно
//   sortPacks?: string // не обязательно //WARNING-QUESTION &sortPacks=0updated => Если харкор параметр в виде стринги то какие ещё варианты
//   page?: number // не обязательно
//   pageCount?: number // не обязательно
//   user_id?: string
//   // чьи колоды не обязательно, или придут все
//   block?: boolean // не обязательно
// }

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 2000,
    minCardsCount: 0,
    maxCardsCount: 100,
    packName: "" as string | null,
    sortPacks: "" as string | null,
    user_id: "" as string | null,
    block: false,
    // filterParams: {
    //   packName: "" as string | null,
    //   min:  0 as number | null, // не обязательно
    //   max: 0 as number | null, // не обязательно
    //   sortPacks: "" as string | null,
    //   page: 0 as number | null, // не обязательно
    //   pageCount: 0 as number | null, // не обязательно
    //   user_id: "" as string | null,
    //   block: false as boolean | null,
    // }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        const packsPage = action.payload.packsPage
        state.cardPacks = packsPage.cardPacks
        state.page = packsPage.page
        state.pageCount = packsPage.pageCount
        state.cardPacksTotalCount = packsPage.cardPacksTotalCount
        state.minCardsCount = packsPage.minCardsCount
        state.maxCardsCount = packsPage.maxCardsCount
      })
      .addCase(createPack.fulfilled, (state, action) => {
        state.cardPacks.unshift(action.payload.pack)
      })
      .addCase(removePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex((pack) => pack._id === action.payload.packId)
        if (index !== -1) state.cardPacks.splice(index, 1)
      })
      .addCase(updatePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex((todo) => todo._id === "id1")
        if (index !== -1) state.cardPacks[index] = action.payload.pack
      })
  },
})

export const packsReducer = slice.reducer
export const packsThunks = {
  fetchPacks,
  createPack,
  removePack,
  updatePack,
}
