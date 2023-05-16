import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"
import { AxiosError, isAxiosError } from "axios"

const slice = createSlice({
  // name должен быть уникальным
  // name будет использоваться в качетве приставки (redux ducks)
  name: "app",
  // Инициализационный стейт
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
    unHandleActions: [] as string[],
  },
  // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
  reducers: {
    // Подредьюсер.
    // Action - это payload объект. Типизация через PayloadAction
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      // Логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending")
        },
        (state, action) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/fulfilled")
        },
        (state, action) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/rejected")
        },
        // WARNING DONT Have type on action
        //   (state, action) => {
        //     const err = action.payload as Error | AxiosError<{ error: string }>
        //     if (isAxiosError(err)) {
        //       state.error = err.response ? err.response.data.error : err.message
        //     } else if (err && err.message) {
        //       state.error = `Native error ${err.message}`
        //     } else {
        //       state.error = "Unexpected error in App"
        //     }
        //     state.isLoading = false
        //   }
        (state, action) => {
          state.isLoading = false
          if (!action.payload.showGlobalError) return
          const err = action.payload.e as Error | AxiosError<{ error: string }>
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message
          } else {
            state.error = `Native error ${err.message}`
          }
        }
      )
  },
})

// Создаем reducer с помощью slice
export const appReducer = slice.reducer
export const appActions = slice.actions
