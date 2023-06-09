import React, { useEffect } from "react"
import { authThunk } from "../auth.slice"
import { Link, useNavigate } from "react-router-dom"
import {
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form"
import { AuthRegisterType } from "../auth.api"
import * as S from "../SignIn/SignIn.styled"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import Input from "@mui/material/Input"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useActions } from "common/hooks"
import { commonActions } from "common/actions/unHandleAction"

type SignUpFormType = AuthRegisterType & {
  confirmPassword: string
}

export const SignUp = () => {
  const navigate = useNavigate()
  // const { register } = useActions(authThunk)
  const { unHandleAction, register } = useActions({
    ...commonActions,
    ...authThunk,
  })

  useEffect(() => {
    //DANGER fale action for learning
    unHandleAction()
  }, [])

  const { control, handleSubmit } = useForm<SignUpFormType>(
    {
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    }
  )

  const onSubmit: SubmitHandler<SignUpFormType> = (
    data
  ) => {
    if (data.password === data.confirmPassword) {
      const tempDataSignUp = {
        email: "artemKab@gmail.com",
        password: "12345678",
      }
      //QUESTION
      // dispatch(authThunk.register(tempDataSignUp))
      register(tempDataSignUp)
        .unwrap()
        .then(() => {
          navigate("/sign-in")
        })
    }
  }

  const [showPassword, setShowPassword] =
    React.useState(false)
  //Mui func for password
  const handleClickShowPassword = () =>
    setShowPassword((show) => !show)

  //Mui func for password
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <S.FormWrapper>
      <S.FormModule onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <FormControl
          key={"emailFormControl"}
          sx={{ m: 1, width: "25ch" }}
          variant="standard"
        >
          <Controller
            name="email"
            key="emailController"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                type="email"
                key="emailTextField"
                id="standard-basic"
                label="Email"
                variant="standard"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl
          key={"PasswordFormControl"}
          sx={{ m: 1, width: "25ch" }}
          variant="standard"
        >
          <InputLabel
            key="PasswordInputLabel"
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Controller
            name="password"
            key={"password"}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                // id="standard-adornment-password"
                key={"password"}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment
                    key={"password"}
                    position="end"
                  >
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
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="standard"
        >
          <InputLabel
            key={"confirmPasswordInputLabel"}
            htmlFor="standard-adornment-password"
          >
            Confirm password
          </InputLabel>
          <Controller
            name="confirmPassword"
            key={"confirmPasswordController"}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                key={"confirmPasswordInput"}
                // id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment
                    key={"confirmPasswordInputAdornment"}
                    position="end"
                  >
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
        <input type="submit" />
        <Link to={"/forgot-password"}>
          Forgot password?
        </Link>
        <Link to={"/sign-in"}>Sign In</Link>
      </S.FormModule>
    </S.FormWrapper>
  )
}
