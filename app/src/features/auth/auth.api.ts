import axios from "axios"
import { instance } from "../../common/api/common.api"

export const authApi = {
  baseUrl: "/auth",
  login(data?: AuthLoginType) {
    const tempData = {
      email: "nya-admin@nya.nya",
      password: "1qazxcvBG",
      rememberMe: false,
    }

    // false - куки умрут если пользователь будет
    // 3 часа бездействовать,
    // true - разрешено 7 дней бездействовать
    return instance.post<ProfileType>(
      this.baseUrl + "/login",
      data ? data : tempData
    )
  },
  register(data?: AuthRegisterType) {
    const tempData = {
      email: "nya-admin@nya.nya",
      password: "1qazxcvBG",
    }
    return instance.post<RegisterResponseType>(
      this.baseUrl + "/register",
      data ? data : tempData
    )
  },
  checkAuth() {
    return instance.post<ProfileType>(this.baseUrl + "/me", {})
  },
  logOut() {
    return instance.delete(this.baseUrl + "/me", {})
  },
  forgotPassword(data: ForgotPassDataForServer) {
    return axios.post("https://neko-back.herokuapp.com/2.0/auth/forgot", data)
  },
}

export type AuthRegisterType = Omit<AuthLoginType, "rememberMe">

export type AuthLoginType = {
  email: string
  password: string
  rememberMe: boolean
}
// false - куки умрут если пользователь будет
// 3 часа бездействовать,
// true - разрешено 7 дней бездействовать

interface RegisterResponseType {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">
}

export interface ProfileType {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}

export interface ForgotPassDataForServer {
  email: string
  from: string
  message: string
}
