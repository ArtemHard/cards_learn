import { useForm, Controller, SubmitHandler } from "react-hook-form"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { BasicButton } from "components/Button/BasicButton"
import { AuthLoginType } from "features/auth/auth.api"
import * as S from "./Form.styled"
import { PasswordInput } from "components/Inputs/PasswordInput/PasswordInput"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { AuthComponentType } from "features/auth/Auth/Auth"
import { checkEmailInstructions, createNewPassInstructions, forgotPassInstructions } from "common/constants"

export type FormPropsType = AuthComponentType & {
  callback: (data: FormInputsType) => void
  email?: string
}
type AuthComponentTypeValues = Pick<AuthComponentType, "type">["type"]

export type FormInputsType = AuthLoginType & {
  rememberMe?: boolean
  passwordConfirm?: string
}

export const Form = ({ type, callback, email }: FormPropsType) => {
  const { control, handleSubmit } = useForm<FormInputsType>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      rememberMe: false,
    },
  })

  const onSubmit: SubmitHandler<FormInputsType> = (data) => {
    callback(data)
  }

  const generaeTextForHtmlElement = (
    type: AuthComponentTypeValues,
    forHtmlElement: "span" | "link" | "button"
  ): Pick<S.TextLinkBlockPropsType, "innerText">["innerText"] => {
    switch (type) {
      case "Sign In":
        if (forHtmlElement === "link") return "Sign Up"
        if (forHtmlElement === "button") return "Sign In"
        else return "Don't have an account?"
      case "Sign Up":
        if (forHtmlElement === "link") return "Sign In"
        if (forHtmlElement === "button") return "Sign Up"
        else return "Already have an account?"
      case "Forgot your password?":
        if (forHtmlElement === "span") return "Did you remember your password?"
        if (forHtmlElement === "button") return "Send Instructions"
        else return "Try logging in"
      // WARNING ИСПРАВИТЬ ДЕФОЛТ
      case "Create new password":
        return "Create new password"
      case "Check Email":
        return "Back to login"
      default:
        return "Sign In"
    }
  }

  return (
    <S.FormWrapper>
      <S.FormModule onSubmit={handleSubmit(onSubmit)}>
        <S.TitleForForm>{type}</S.TitleForForm>
        {type === "Check Email" && <S.SVGEmail />}
        {type !== "Create new password" && type !== "Check Email" && (
          <TextInput
            name="email"
            label="Email"
            type="email"
            key={"email"}
            rules={{
              required: true,
            }}
            control={control}
          />
        )}
        {type !== "Forgot your password?" && type !== "Check Email" && (
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
        )}
        {type === "Forgot your password?" && <S.TextBlock text={forgotPassInstructions} />}
        {type === "Create new password" && <S.TextBlock text={createNewPassInstructions} />}
        {type === "Check Email" && <S.TextBlock text={checkEmailInstructions} email={email} />}
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
                control={<Checkbox defaultChecked={false} {...field} />}
                // WARNING How to stylised this label
                label={"Remember me"}
              />
            )}
          />
        )}
        {type === "Sign In" && <S.TextLinkBlock innerText={"Forgot password?"} />}
        <BasicButton buttonText={generaeTextForHtmlElement(type, "button")} />
        {type !== "Check Email" && type !== "Create new password" && (
          <S.TextLinkBlock innerText={generaeTextForHtmlElement(type, "span")} />
        )}
        {type !== "Check Email" && type !== "Create new password" && (
          <S.TextLinkBlock innerText={generaeTextForHtmlElement(type, "link")} />
        )}
      </S.FormModule>
    </S.FormWrapper>
  )
}
