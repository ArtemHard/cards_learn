import { createSlice } from "@reduxjs/toolkit"
import {
  authApi,
  AuthLoginType,
  AuthRegisterType,
  ForgotPassDataForServer,
  ProfileType,
  RegisterResponseType,
  SetNewPasswordData,
  updateUserData,
} from "./auth.api"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"

import { thunkTryCatch } from "common/utils/thunkTryCatch"
import { appActions } from "app/app.slice"

const register = createAppAsyncThunk<{ profile: ProfileType }, AuthRegisterType>(
  "auth/register",
  async (arg, thunkApi) => {
    const { dispatch } = thunkApi
    // dispatch(appActions.setIsLoading({ isLoading: true }))
    return await thunkTryCatch(thunkApi, async () => {
      const res = await authApi.register(arg)
      return { profile: res.data.addedUser }
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

const login = createAppAsyncThunk<{ profile: ProfileType }, AuthLoginType>("auth/login", async (arg, thunkApi) => {
  return await thunkTryCatch(
    thunkApi,
    async () => {
      const res = await authApi.login(arg)
      return { profile: res.data }
    },
    false
  )
  // const { getState } = thunkApi
  // const state = getState()
  // const res = await authApi.login(arg)
  // return { profile: res.data }
  // const { dispatch, rejectWithValue } = thunkApi
  // try {
  //   const res = await authApi.login(arg)

  //   return { profile: res.data }
  // } catch (e: any) {
  //   dispatch(
  //     appActions.setError({
  //       error: e.response ? e.response.data.error : e.message,
  //     })
  //   )
  //   return rejectWithValue(null)
  // }
})

const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>("auth/me", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.checkAuth()
    return {
      profile: res.data,
    }
  })
  // const res = await authApi.checkAuth()
  // return {
  //   profile: res.data,
  // }
})

const logOut = createAppAsyncThunk("auth/logOut", async (arg, thunkAPI) => {
  return await thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.logOut()
    return res.status
  })
})

const forgotPassword = createAppAsyncThunk<{ sendEmail: string }, ForgotPassDataForServer>(
  "auth/forgot",
  async (arg, thunkAPI) => {
    return await thunkTryCatch(thunkAPI, async () => {
      await authApi.forgotPassword(arg)
      // Promise.resolve()
      return {
        sendEmail: arg.email,
      }
    })
  }
)

const setNewPassword = createAppAsyncThunk<void, SetNewPasswordData>("auth/set-new-password", async (arg, thunkApi) => {
  return await thunkTryCatch(thunkApi, async () => {
    await authApi.setNewPassword(arg)
  })
})

const updateUser = createAppAsyncThunk<{ profile: ProfileType }, updateUserData>(
  "auth/update-user",
  async (arg, thunkApi) => {
    return await thunkTryCatch(thunkApi, async () => {
      if (arg.name) {
        const res = await authApi.updateUser({ name: arg.name })
        return {
          profile: res.data.updatedUser,
        }
      }
      if (arg.avatar) {
        const res = await authApi.updateUser({ avatar: arg.avatar })
        return {
          profile: res.data.updatedUser,
        }
      }
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
        if (action.payload === 200) {
          state.profile = null
        }
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.sendEmail = action.payload.sendEmail
      })
      .addCase(register.rejected, (state, action) => {
        // state.authError = action.error
      })
      .addCase(register.fulfilled, (state, action) => {
        state.profile = action.payload.profile
        // state.authError = action.error
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.profile = action.payload.profile
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
  updateUser,
}
