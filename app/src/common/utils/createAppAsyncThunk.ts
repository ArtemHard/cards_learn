import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "app/store"

/**

A utility function that creates an async thunk with predefined types for state, dispatch, and reject value.
@param {string} typePrefix - A prefix string for the action type.
@param {AsyncThunkPayloadCreator<unknown, RootState, { dispatch: AppDispatch, rejectValue: unknown }>} payloadCreator - The payload creator function.
@param {AsyncThunkOptions<RootState, { dispatch: AppDispatch, rejectValue: unknown }, { serializeError: { shouldSerializeError: boolean } }>} options - The options object for the async thunk.
@returns {AsyncThunk<unknown, RootState, { dispatch: AppDispatch, rejectValue: unknown }>} An async thunk with predefined types for state, dispatch, and reject value.
*/

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: unknown
}>()
