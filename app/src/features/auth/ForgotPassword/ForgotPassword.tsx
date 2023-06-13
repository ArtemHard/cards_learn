import React from "react"
import * as S from "../Auth/Auth.styled"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import { Link, useNavigate } from "react-router-dom"

import { authThunk } from "../auth.slice"
import { useActions, useAppDispatch } from "common/hooks"
import { Form, FormInputsType } from "components/Form/Form"

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { forgotPassword } = useActions(authThunk)
  // const { control, handleSubmit } = useForm<{
  //   email: string
  // }>({
  //   defaultValues: {
  //     email: "",
  //   },
  // })

  // const onSubmit: SubmitHandler<{ email: string }> = (data) => {
  //   const dataForServer = {
  //     email: data.email,
  //     from: "test-front-admin <ai73a@yandex.by>",
  //     message: `<div style="background-color: lime; padding: 15px">
  //     password recovery link:
  //     <a href='http://localhost:3000/#/set-new-password/$token$'>
  //     link</a>
  //     </div>`,
  //   }
  //   //const fake data for develop
  //   const tempDataSignIn = {
  //     email: "nya@nya.nya",
  //     from: "test-front-admin <ai73a@yandex.by>",
  //     message: `<div style="background-color: lime; padding: 15px">
  //     password recovery link:
  //     <a href='http://localhost:3000/#/set-new-password/$token$'>
  //     link</a>
  //     </div>`,
  //   }
  //   dispatch(authThunk.forgotPassword(tempDataSignIn))
  //     .unwrap()
  //     .then(() => {
  //       navigate("/check-email")
  //     })
  // }

  const callback = (data: FormInputsType) => {
    const { email } = data
    const dataForServer = {
      from: "ArtemHard",
      // WARNING-ATTENTION Need poin out my frontPAge on deploy
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    }
    forgotPassword({
      email: data.email,
      ...dataForServer,
    })
      .unwrap()
      .then(() => {
        navigate("/check-email")
      })
  }
  return <Form type="Forgot your password?" callback={callback} />
}
