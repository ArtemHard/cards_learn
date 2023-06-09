import React from "react"
import * as S from "../SignIn/SignIn.styled"
import {
  Controller,
  useForm,
  SubmitHandler,
} from "react-hook-form"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import { Link, useNavigate } from "react-router-dom"

import { authThunk } from "../auth.slice"
import { useAppDispatch } from "common/hooks"

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { control, handleSubmit } = useForm<{
    email: string
  }>({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit: SubmitHandler<{ email: string }> = (
    data
  ) => {
    const dataForServer = {
      email: data.email,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: lime; padding: 15px">
      password recovery link: 
      <a href='http://localhost:3000/#/set-new-password/$token$'>
      link</a>
      </div>`,
    }
    //const fake data for develop
    const tempDataSignIn = {
      email: "nya@nya.nya",
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: lime; padding: 15px">
      password recovery link: 
      <a href='http://localhost:3000/#/set-new-password/$token$'>
      link</a>
      </div>`,
    }
    dispatch(authThunk.forgotPassword(tempDataSignIn))
      .unwrap()
      .then(() => {
        navigate("/check-email")
      })
  }

  return (
    <S.FormWrapper>
      <S.FormModule onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              type="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              {...field}
            />
          )}
        />
        <InputLabel htmlFor="standard-adornment-password">
          Enter your email address and we will send you
          further instructions
        </InputLabel>
        <button type="submit">Send instructions</button>
        <span>Did you remember your password?</span>
        <Link to={"/sign-in"}>Try logging in</Link>
      </S.FormModule>
    </S.FormWrapper>
  )
}
