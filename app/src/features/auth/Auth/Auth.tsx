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
import * as S from "./Auth.styled"
import { useActions, useAppSelector } from "common/hooks"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { selectorIsAuth } from "../auth.selectors"
import { BasicButton } from "components/Button/BasicButton"
import styled from "styled-components"
import { Form, FormInputsType, FormPropsType } from "components/Form/Form"

export type AuthComponentType = {
  type: "Sign In" | "Sign Up" | "Forgot your password?" | "Check Email" | "Create new password" | "Personal Information"
}

export const Auth = ({ type }: AuthComponentType) => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(selectorIsAuth)

  const { login, register } = useActions(authThunk)

  if (!!isAuth) navigate("/")

  const queryLogin = (data: FormInputsType) => {
    const { passwordConfirm, ...signInData } = data

    login(signInData)
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
  const queryRegister = (data: FormInputsType) => {
    const { rememberMe, passwordConfirm, ...signUpData } = data
    console.log(signUpData)
    register(signUpData)
      .unwrap()
      .then(() => {
        navigate("/sign-in")
      })
  }

  return <Form type={type} callback={type === "Sign In" ? queryLogin : queryRegister} />
}

// const isAuth = useAppSelector(selectorIsAuth)
// const navigate = useNavigate()
// const { login } = useActions(authThunk)
// const { control, handleSubmit } = useForm<AuthLoginType>({
//   defaultValues: {
//     email: "",
//     password: "",
//     rememberMe: false,
//   },
// })
// const onSubmit: SubmitHandler<AuthLoginType> = (data) => {
//   const tempDataSignIn = {
//     email: "artemKab@gmail.com",
//     password: "12345678",
//     rememberMe: false,
//   }
//   login(tempDataSignIn)
//     .unwrap()
//     .then((result) => {
//       toast.success("Вы успешно залогинились")
//     })
//     .catch((err: any) => {
//       // toast.error(err.e.response.data.error)
//       if (isAxiosError(err.e)) {
//         const axiosErr = err.e?.response?.data?.error
//         if (typeof axiosErr === "string") {
//           toast.error(axiosErr)
//         } else {
//           toast.error(err.e.message)
//         }
//       }
//     })
// }
// const [showPassword, setShowPassword] =
//   React.useState(false)
// //Mui func for password
// const handleClickShowPassword = () =>
//   setShowPassword((show) => !show)
// //Mui func for password
// const handleMouseDownPassword = (
//   event: React.MouseEvent<HTMLButtonElement>
// ) => {
//   event.preventDefault()
// }
// if (!!isAuth) navigate("/")
// return (
//   // <form onSubmit={handleSubmit(onSubmit)}>
//   <S.FormWrapper>
//     <S.FormModule onSubmit={handleSubmit(onSubmit)}>
//       <S.TitleForForm>Sign In</S.TitleForForm>
//       <FormControl
//         sx={{ m: 1, width: "100%", marginBottom: "24px" }}
//         variant="standard"
//       >
//         <Controller
//           name="email"
//           control={control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <TextField
//               type="email"
//               id="standard-basic"
//               label="Email"
//               variant="standard"
//               {...field}
//             />
//           )}
//         />
//       </FormControl>
//       <FormControl
//         sx={{ width: "100%", marginBottom: "24px" }}
//         variant="standard"
//       >
//         <InputLabel htmlFor="standard-adornment-password">
//           Password
//         </InputLabel>
//         <Controller
//           name="password"
//           control={control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <Input
//               id="standard-adornment-password"
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                   >
//                     {showPassword ? (
//                       <VisibilityOff />
//                     ) : (
//                       <Visibility />
//                     )}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               {...field}
//             />
//           )}
//         />
//       </FormControl>
//       <Controller
//         name="rememberMe"
//         control={control}
//         render={({ field }) => (
//           <FormControlLabel
//             sx={{
//               m: 1,
//               margin: 0,
//               marginBottom: "29px",
//               width: "100%",
//             }}
//             control={
//               <Checkbox
//                 defaultChecked={false}
//                 {...field}
//               />
//             }
//             // WARNING How to stylised this label
//             label={"Remember me"}
//           />
//         )}
//       />
//       <Link to={"/forgot-password"}>
//         Forgot password?
//       </Link>
//       <BasicButton buttonText="submit" />
//       <Link to={"/sign-up"}>Sign Up</Link>
//     </S.FormModule>
//   </S.FormWrapper>
//   // {/* </form> */}
// )
