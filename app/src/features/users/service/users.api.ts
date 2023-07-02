import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "common/api/common.api"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),
  endpoints: (build) => {
    return {
      getUsers: build.query<UsersData, UsersGetParam>({
        query: (query) => {
          return {
            method: "GET",
            url: "/social/users",
            params: {
              ...query,
            },
          }
        },
      }),
    }
  },
})

export const { useGetUsersQuery } = usersApi

type UsersGetParam = {
  userName?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  sortUsers?: string //'0publicCardPacksCount', // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
}

type User = {
  avatar: string
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  updated: string
  verified: boolean
  _id: string
}

type UsersData = {
  users: User[]
  maxPublicCardPacksCount: number
  minPublicCardPacksCount: number
  page: number
  pageCount: number
  usersTotalCount: number
}
