import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, RootState } from "app/store"

// export const thunkTryCatch = async (
//   thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
//   logic: Function
// ) => {
//   const { rejectWithValue } = thunkAPI
//   try {
//     return await logic()
//   } catch (e) {
//     console.log(e)

//     // WARNING здесь null был
//     return rejectWithValue(e)
//   }
// }
export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  logic: Function,
  showGlobalError: boolean = true
) => {
  const { rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (e) {
    return rejectWithValue({ e, showGlobalError })
  }
}
