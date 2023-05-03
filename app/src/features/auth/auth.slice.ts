import { createSlice } from "@reduxjs/toolkit"
import {
  authApi,
  AuthLoginType,
  AuthRegisterType,
  ProfileType,
} from "./auth.api"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { AxiosResponse } from "axios"

const register = createAppAsyncThunk<void, AuthRegisterType>(
  "auth/register",
  async (arg, thunkApi) => {
    await authApi.register(arg)
  }
)

const login = createAppAsyncThunk<{ profile: ProfileType }, AuthLoginType>(
  "auth/login",
  async (arg, thunkApi) => {
    const { getState } = thunkApi
    const state = getState()
    const res = await authApi.login(arg)
    return { profile: res.data }
  }
)

const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async () => {
    const res = await authApi.checkAuth()
    return {
      profile: res.data,
    }
  }
)

const logOut = createAppAsyncThunk("auth/logOut", async () => {
  const res = await authApi.logOut()
  return res
})

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(logOut.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.profile = null
        }
      })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunk = { register, login, logOut, authMe }
