import { createSlice } from "@reduxjs/toolkit"
import {
  authApi,
  AuthLoginType,
  AuthRegisterType,
  ForgotPassDataForServer,
  ProfileType,
  SetNewPasswordData,
} from "./auth.api"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"

import { thunkTryCatch } from "common/utils/thunkTryCatch"
import { appActions } from "app/app.slice"

const register = createAppAsyncThunk<void, AuthRegisterType>(
  "auth/register",
  async (arg, thunkApi) => {
    const { dispatch } = thunkApi
    // dispatch(appActions.setIsLoading({ isLoading: true }))
    return await thunkTryCatch(thunkApi, async () => {
      await authApi.register(arg)
    })
    // const { dispatch, rejectWithValue } = thunkApi
    // try {
    //   await authApi.register(arg)
    // } catch (e: any) {
    //   dispatch(
    //     appActions.setError({
    //       error: e.response ? e.response.data.error : e.message,
    //     })
    //   )
    //   return rejectWithValue(null)
    // }
  }
)

const login = createAppAsyncThunk<{ profile: ProfileType }, AuthLoginType>(
  "auth/login",
  async (arg, thunkApi) => {
    // const { getState } = thunkApi
    // const state = getState()
    // const res = await authApi.login(arg)
    // return { profile: res.data }
    const { dispatch, rejectWithValue } = thunkApi
    try {
      const res = await authApi.login(arg)

      return { profile: res.data }
    } catch (e: any) {
      dispatch(
        appActions.setError({
          error: e.response ? e.response.data.error : e.message,
        })
      )
      return rejectWithValue(null)
    }

    // return await thunkTryCatch(thunkApi, async () => {
    //   await authApi.login(arg)
    // })
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

const forgotPassword = createAppAsyncThunk<any, ForgotPassDataForServer>(
  "auth/forgot",
  async (arg) => {
    // const res = await authApi.forgotPassword(arg)
    // console.log(res)
    //WARNING Не понятно куда слать запрос
    return Promise.resolve(arg.email)
  }
)

const setNewPassword = createAppAsyncThunk<void, SetNewPasswordData>(
  "auth/set-new-password",
  async (arg, thunkApi) => {
    return await thunkTryCatch(thunkApi, async () => {
      await authApi.setNewPassword(arg)
    })
  }
)

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    sendEmail: null as null | string,
    authError: "",
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
      .addCase(forgotPassword.fulfilled, (state, action) => {
        // console.log(action.payload())
        state.sendEmail = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        // state.authError = action.error
      })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunk = {
  register,
  login,
  logOut,
  authMe,
  forgotPassword,
  setNewPassword,
}
