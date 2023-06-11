import React from "react"
import TextField from "@mui/material/TextField"
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Input from "@mui/material/Input"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { useActions, useAppSelector } from "common/hooks"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { BasicButton } from "components/Button/BasicButton"
import styled from "styled-components"
import { selectorIsAuth } from "features/auth/auth.selectors"
import { authThunk } from "features/auth/auth.slice"
import { AuthLoginType } from "features/auth/auth.api"
import * as S from "./Form.styled"

export type FormPropsType = {
  type: "Sign In" | "Sign Up"
}

type FormInputsType = AuthLoginType & {
  rememberMe?: boolean
  passwordConfirm?: string
}

export const Form = ({ type }: FormPropsType) => {
  const isAuth = useAppSelector(selectorIsAuth)
  const navigate = useNavigate()
  const { login } = useActions(authThunk)

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
    const tempDataSignIn = {
      email: "artemKab@gmail.com",
      password: "12345678",
      rememberMe: false,
    }
    login(tempDataSignIn)
      .unwrap()
      .then((result) => {
        toast.success("Вы успешно залогинились")
      })
      .catch((err: any) => {
        // toast.error(err.e.response.data.error)
        if (isAxiosError(err.e)) {
          const axiosErr = err.e?.response?.data?.error
          if (typeof axiosErr === "string") {
            toast.error(axiosErr)
          } else {
            toast.error(err.e.message)
          }
        }
      })
  }

  const [showPassword, setShowPassword] =
    React.useState(false)
  // const [showPasswordConfirm, setShowPasswordConfirm] =
  //   React.useState(false)
  //Mui func for password
  const handleClickShowPassword = () =>
    setShowPassword((show) => !show)
  // const handleClickShowPasswordConfirm = () =>
  //   setShowPasswordConfirm((show) => !show)

  //Mui func for password
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  if (!!isAuth) navigate("/")
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <S.FormWrapper>
      <S.FormModule onSubmit={handleSubmit(onSubmit)}>
        <S.TitleForForm>{type}</S.TitleForForm>
        <FormControl
          sx={{ m: 1, width: "100%", marginBottom: "24px" }}
          variant="standard"
        >
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
        </FormControl>
        <FormControl
          sx={{ width: "100%", marginBottom: "24px" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                {...field}
              />
            )}
          />
        </FormControl>
        {type === "Sign Up" && (
          <FormControl
            sx={{ width: "100%", marginBottom: "60px" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Confirm password
            </InputLabel>
            <Controller
              name="passwordConfirm"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={
                          handleMouseDownPassword
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...field}
                />
              )}
            />
          </FormControl>
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
              : "ALready have an account?"
          }
        />
        <S.TextLinkBlock
          innerText={
            type === "Sign In" ? "Sign Up" : "Sign In"
          }
        />
      </S.FormModule>
    </S.FormWrapper>
    // {/* </form> */}
  )
}
