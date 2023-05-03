import React from "react"
import { authThunk } from "../auth.slice"
import { useAppDispatch, useAppSelector } from "app/hooks"
import TextField from "@mui/material/TextField"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
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
    console.log(data)
    const tempDataSignIn = {
      email: "artemKab@gmail.com",
      password: "12345678",
      rememberMe: false,
    }
    dispatch(authThunk.login(tempDataSignIn))
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
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
      <NavLink
        to="/sign-up"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Sign Up
      </NavLink>
      ;
    </form>
  )
}
