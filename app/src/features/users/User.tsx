import React from "react"
import { useGetUsersQuery } from "./service/users.api"
import { useAppSelector } from "common/hooks"
import { selectorPackUserId } from "features/cards/cards.selector"

export const User = () => {
  const { data, error, isLoading } = useGetUsersQuery({ userName: "Rassel Crow" })
  //   debugger
  console.log(data)

  return <div>User</div>
}
