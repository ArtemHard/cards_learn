import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, RootState } from "app/store"

// export const thunkTryCatch = async (
//   thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
//   logic: Function
// ) => {
//   const {   } = thunkAPI
//   try {
//     return await logic()
//   } catch (e) {
//     console.log(e)

//     // WARNING здесь null был
//     return rejectWithValue(e)
//   }
// }

/**

A utility function that creates a try-catch block around a given logic function and returns a promise that resolves to the result of the logic function or rejects with the caught error object and a flag to indicate whether a global error should be displayed.
@param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - The base thunk API object.
@param {Function} logic - The function to wrap in a try-catch block.
@param {boolean} [showGlobalError=true] - A flag to indicate whether a global error should be displayed. Default value is true.
@returns {Promise} A promise that resolves to the result of the logic function or rejects with the caught error object and a flag to indicate whether a global error should be displayed.
*/

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<
    RootState,
    any,
    AppDispatch,
    unknown
  >,
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
