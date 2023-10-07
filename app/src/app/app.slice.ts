import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"
import { AxiosError, isAxiosError } from "axios"
import { PATH } from "routes/path"

const slice = createSlice({
  // name должен быть уникальным
  // name будет использоваться в качетве приставки (redux ducks)
  name: "app",
  // Инициализационный стейт
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false as boolean,
    unHandleActions: [] as string[],
  },

  reducers: {
    // Action - это payload объект. Типизация через PayloadAction
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (state, action: PayloadAction<boolean>) => {
      state.isAppInitialized = action.payload
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
          // if (action.type === "auth/me/rejected") {
          //   return
          // }
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
