import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/app.slice"
import { AppDispatch, RootState } from "app/store"
import { AxiosError, isAxiosError } from "axios"

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  logic: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    // dispatch(appActions.setIsLoading({ isLoading: true }))
    return await logic()
  } catch (e) {
    // dispatch(appActions.setIsLoading({ isLoading: true }))

    return rejectWithValue(null)
  }
}
