import React from "react"
import { authThunk } from "../auth.slice"
import TextField from "@mui/material/TextField"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Input from "@mui/material/Input"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { AuthLoginType } from "../auth.api"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { toast } from "react-toastify"
import { AxiosError, isAxiosError } from "axios"

export const SignIn = () => {
  const isAuth = useAppSelector((state) => state.auth.profile?.name)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { control, handleSubmit } = useForm<AuthLoginType>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit: SubmitHandler<AuthLoginType> = (data) => {
    const tempDataSignIn = {
      email: "artemKab@gmail.com",
      password: "12345678",
      rememberMe: false,
    }
    dispatch(authThunk.login(tempDataSignIn))
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

  const [showPassword, setShowPassword] = React.useState(false)
  //Mui func for password
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  //Mui func for password
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  if (!!isAuth) navigate("/")

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <FormWrapper>
      <FormModule onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...field}
              />
            )}
          />
        </FormControl>
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox defaultChecked={false} {...field} />}
              label="Remember me"
            />
          )}
        />
        <input type="submit" />
        <Link to={"/forgot-password"}>Forgot password?</Link>
        <Link to={"/sign-up"}>Sign Up</Link>
      </FormModule>
    </FormWrapper>
    // {/* </form> */}
  )
}
export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`
export const FormModule = styled.form`
  margin-top: 60px;
  /* margin: 60px 433px 72px 434px; */
  height: 552px;
  width: 413px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`
