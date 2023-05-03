import { useAppDispatch } from "app/hooks"
import React from "react"
import { authThunk } from "../auth.slice"
import { Link } from "react-router-dom"

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const registerHandler = () => {
    const tempDataForRegister = {
      email: "artemKab@gmail.com",
      password: "12345678",
      // rememberMe: false,
    }
    dispatch(authThunk.register(tempDataForRegister))
  }
  return (
    <div>
      <h1>SignUn-Register</h1>
      <button onClick={registerHandler}>SignIn</button>
      <Link to={"/sign-in"}>Sign Up</Link>
    </div>
  )
}
