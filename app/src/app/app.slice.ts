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
        (state, action) => {
          const err = action.payload as Error | AxiosError<{ error: string }>
          console.log(err)
          if (isAxiosError(err)) {
            state.isLoading = false
            state.error = err.response ? err.response.data.error : err.message
            // dispatch(appActions.setError({ error }))
          } else if (err && err.message) {
            state.isLoading = false
            state.error = `Native error ${err.message}`
            // dispatch(appActions.setError({ error: `Native error ${err.message}` }))
          } else {
            state.isLoading = false
            state.error = "Unexpected error in App"
          }
        }
      )
  },
})

// Создаем reducer с помощью slice
export const appReducer = slice.reducer
export const appActions = slice.actions
