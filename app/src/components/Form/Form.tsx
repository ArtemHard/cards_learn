import React from "react"
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { useActions, useAppSelector } from "common/hooks"
import { BasicButton } from "components/Button/BasicButton"
import { selectorIsAuth } from "features/auth/auth.selectors"
import { authThunk } from "features/auth/auth.slice"
import { AuthLoginType } from "features/auth/auth.api"
import * as S from "./Form.styled"
import { PasswordInput } from "components/Inputs/PasswordInput/PasswordInput"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { AuthComponentType } from "features/auth/SignIn/Auth"

export type FormPropsType = AuthComponentType & {
  callback: (data: FormInputsType) => void
}

export type FormInputsType = AuthLoginType & {
  rememberMe?: boolean
  passwordConfirm?: string
}

export const Form = ({ type, callback }: FormPropsType) => {
  const { control, handleSubmit } = useForm<FormInputsType>(
    {
      defaultValues: {
        email: "",
        password: "",
        passwordConfirm: "",
        rememberMe: false,
      },
    }
  )

  const onSubmit: SubmitHandler<FormInputsType> = (
    data
  ) => {
    callback(data)
    // const tempDataSignIn = {
    //   email: "artemKab@gmail.com",
    //   password: "12345678",
    //   rememberMe: false,
    // }

    //   if (type === "Sign In") {
    //     const { passwordConfirm, ...signInData } = data
    //     console.log(signInData)

    //     login(signIn123Data)
    //       .unwrap()
    //       .then((result) => {
    //         toast.success("Вы успешно залогинились")
    //       })
    //       .catch((err: any) => {
    //         // toast.error(err.e.response.data.error)
    //         if (isAxiosError(err.e)) {
    //           const axiosErr = err.e?.response?.data?.error
    //           if (typeof axiosErr === "string") {
    //             toast.error(axiosErr)
    //           } else {
    //             toast.error(err.e.message)
    //           }
    //         }
    //       })
    //   }
    //   if (type === "Sign Up") {
    //     const { rememberMe, passwordConfirm, ...signUpData } =
    //       data
    //     console.log(signUpData)
    //     register(signUpData)
    //       .unwrap()
    //       .then(() => {
    //         navigate("/sign-in")
    //       })
    //   }
  }

  return (
    <S.FormWrapper>
      <S.FormModule onSubmit={handleSubmit(onSubmit)}>
        <S.TitleForForm>{type}</S.TitleForForm>
        <TextInput
          control={control}
          label="Email"
          name="email"
          key="email"
          rules={{ required: true }}
          type="email"
        />
        <PasswordInput
          name="password"
          key={"password"}
          control={control}
          label="Password"
          marginBottom="24px"
          rules={{
            required: true,
            minLength: 8,
          }}
        />
        {type === "Sign Up" && (
          <PasswordInput
            name="passwordConfirm"
            key={"passwordConfirm"}
            control={control}
            label="Confirm password"
            marginBottom="60px"
            rules={{
              required: true,
              minLength: 8,
            }}
          />
        )}
        {type === "Sign In" && (
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{
                  m: 1,
                  margin: 0,
                  marginBottom: "29px",
                  width: "100%",
                }}
                control={
                  <Checkbox
                    defaultChecked={false}
                    {...field}
                  />
                }
                // WARNING How to stylised this label
                label={"Remember me"}
              />
            )}
          />
        )}
        {type === "Sign In" && (
          <S.TextLinkBlock innerText={"Forgot password?"} />
        )}
        <BasicButton buttonText={type} />
        <S.TextLinkBlock
          innerText={
            type === "Sign In"
              ? "Don't have an account?"
              : "Already have an account?"
          }
        />
        <S.TextLinkBlock
          innerText={
            type === "Sign In" ? "Sign Up" : "Sign In"
          }
        />
      </S.FormModule>
    </S.FormWrapper>
  )
}
