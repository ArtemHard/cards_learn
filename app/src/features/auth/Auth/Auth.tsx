import { authThunk } from "../auth.slice"
import { useNavigate } from "react-router-dom"
import { useActions, useAppSelector } from "common/hooks"
import { toast } from "react-toastify"
import { Form, FormInputsType } from "components/Form/Form"
import { errorToastHandler } from "common/utils"
import { selectorIsAuth } from "../auth.selectors"
import { PATH } from "routes/path"

export type AuthComponentType = {
  type: "Sign In" | "Sign Up" | "Forgot your password?" | "Check Email" | "Create new password" | "Personal Information"
}

export const Auth = ({ type }: AuthComponentType) => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(selectorIsAuth)

  const { login, register } = useActions(authThunk)

  if (!!isAuth) navigate(PATH.PACKS)

  const queryLogin = (data: FormInputsType) => {
    const { passwordConfirm, ...signInData } = data
    // const tempDataSignIn = {
    //   email: "artemKab@gmail.com",
    //   password: "12345678",
    //   rememberMe: false,
    // }
    //WARNING FIX TEMPDATA to signInData
    // asdfasdfsdfgsd@sdfsd.sdf
    // pass 12345678
    login(signInData)
      .unwrap()
      .then(() => {
        toast.success("Вы успешно залогинились")
        navigate(PATH.PACKS)
      })
      .catch(errorToastHandler)
  }
  const queryRegister = (data: FormInputsType) => {
    const { rememberMe, passwordConfirm, ...signUpData } = data
    register(signUpData)
      .unwrap()
      .then((result) => {
        // if (result?.profile?._id) {
        toast.success("Вы успешно зарегистрировались")
        navigate(PATH.LOGIN)
        // }
      })
  }
  console.log("RERENDER AUTH")

  return (
    <>
      <Form type={type} callback={type === "Sign In" ? queryLogin : queryRegister} />
    </>
  )
}
