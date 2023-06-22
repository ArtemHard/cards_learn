import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, thunkTryCatch } from "common/utils"
import { ArgCreatePackType, FetchPacksResponseType, PackType } from "features/packs/packs.api.types"
import { GetParamsType, packsApi } from "./packs.api"

const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType }, void>(
  "packs/fetchPacks",
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { packName, min, max, sortPacks, page, pageCount, user_id, block } = thunkAPI.getState().packs.filterParams
      const dataForServer = {
        packName: packName, // не обязательно
        min: min, // не обязательно
        max: max, // не обязательно
        sortPacks: sortPacks, // не обязательно
        page: page, // не обязательно
        pageCount: pageCount, // не обязательно
        user_id: user_id,
        // чьи колоды не обязательно, или придут все
        block: block, // не обязательно
      }
      const filteredObj: GetParamsType = Object.fromEntries(
        Object.entries(dataForServer).filter(([key, value]) => !!value)
      )
      const res = await packsApi.getPacks({ ...filteredObj })
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
    })
  }
)

const removePack = createAppAsyncThunk<{ packId: string }, string>("packs/removePack", async (id, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.removePack(id)
    return { packId: res.data.deletedCardsPack._id }
  })
})

const updatePack = createAppAsyncThunk<{ pack: PackType }, PackType>("packs/updatePack", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.updatePack(arg)

    return { pack: res.data.updatedCardsPack }
  })
})

type FilterParams = Partial<typeof initialState.filterParams>

const initialState = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: 2000,
  minCardsCount: 0,
  maxCardsCount: 100,
  filterParams: {
    packName: "" as string | null,
    min: 0 as number | null, // не обязательно
    max: 100 as number | null, // не обязательно
    sortPacks: "" as string | null,
    page: 1 as number | null, // не обязательно
    pageCount: 10 as number | null, // не обязательно
    user_id: "" as string | null,
    block: false as boolean | null,
  },
}
const slice = createSlice({
  name: "packs",
  initialState,
  reducers: {
    changeFilterParams: (state, action: PayloadAction<FilterParams>) => {
      state.filterParams = { ...state.filterParams, ...action.payload }
    },
    clearFilter: (state) => {
      //min max занулять для связи со слайдером
      state.filterParams = {
        ...initialState.filterParams,
        min: state.minCardsCount,
        max: state.maxCardsCount,
      }
    },
    //WARNING-QUESTION dont work
    // showUserPacks: (state, action: PayloadAction<Pick<ProfileType, "_id">>) => {
    //   state.cardPacks = state.cardPacks.filter((pack) => pack.user_id !== action.payload._id)
    // },
  },
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
        const index = state.cardPacks.findIndex((pack) => pack._id === action.payload.pack._id)
        if (index !== -1) state.cardPacks[index] = action.payload.pack
      })
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = {
  fetchPacks,
  createPack,
  removePack,
  updatePack,
}
