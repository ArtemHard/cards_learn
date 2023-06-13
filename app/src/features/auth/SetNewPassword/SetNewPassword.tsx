import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import styled from "styled-components"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Input from "@mui/material/Input"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import { useNavigate } from "react-router-dom"
import { authThunk } from "../auth.slice"
import { useAppDispatch } from "common/hooks"
import { Form } from "components/Form/Form"

export const SetNewPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { control, handleSubmit, reset } = useForm<{ password: string }>({
    defaultValues: {
      password: "",
    },
  })

  const [showPassword, setShowPassword] = React.useState(false)
  //Mui func for password
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  //Mui func for password
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<{ password: string }> = (data) => {
    const tempDataSignIn = {
      password: data.password,
      resetPasswordToken: "some-token-from-url",
    }
    console.log(tempDataSignIn)
    reset()
    dispatch(authThunk.setNewPassword(tempDataSignIn))
  }

  return (
    <Form type="Create new password" callback={onSubmit} />
    // <SetNewPasswordWrapper>
    //   <SetNewPasswordContainer onSubmit={handleSubmit(onSubmit)}>
    //     <h1>Create new password </h1>
    //     <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
    //       <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
    //       <Controller
    //         name="password"
    //         control={control}
    //         rules={{ required: true }}
    //         render={({ field }) => (
    //           <Input
    //             id="standard-adornment-password"
    //             type={showPassword ? "text" : "password"}
    //             endAdornment={
    //               <InputAdornment position="end">
    //                 <IconButton
    //                   aria-label="toggle password visibility"
    //                   onClick={handleClickShowPassword}
    //                   onMouseDown={handleMouseDownPassword}
    //                 >
    //                   {showPassword ? <VisibilityOff /> : <Visibility />}
    //                 </IconButton>
    //               </InputAdornment>
    //             }
    //             {...field}
    //           />
    //         )}
    //       />
    //     </FormControl>
    //     <span>Create new password and we will send you further instructors to email</span>
    //     <input type="submit" />
    //   </SetNewPasswordContainer>
    // </SetNewPasswordWrapper>
  )
}

const SetNewPasswordWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SetNewPasswordContainer = styled.form`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 413px;
  height: 408px;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`
