import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { checkEmailInstructions, createNewPassInstructions, forgotPassInstructions } from "common/constants"
import { FormPropsType } from "./Form"

const links = [
  {
    id: 1,
    link: "/forgot-password",
    innerText: "Forgot password?",
  },
  {
    id: 2,
    link: "/sign-up",
    innerText: "Sign Up",
  },
  {
    id: 3,
    link: "/sign-in",
    innerText: "Sign In",
  },
  {
    id: 4,
    link: "/sign-in",
    innerText: "Try logging in",
  },
]

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`
export const FormModule = styled.form`
  padding: 35px 33px 38px 33px;
  /* margin: 60px 433px 72px 434px; */
  height: 552px;
  width: 413px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

export const TitleForForm = styled.h1`
  font-family: "Montserrat", sans-serif;
  margin: 0;
  margin-bottom: 41px;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  /* identical to box height */
  color: #000000;
`

const ForgotPassLink = styled.span<Pick<TextLinkBlockPropsType, "innerText">>`
  cursor: ${(props) =>
    props.innerText === "Don't have an account?" ||
    props.innerText === "Already have an account?" ||
    props.innerText === "Did you remember your password?"
      ? null
      : "pointer"};
  display: flex;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: ${(props) =>
    props.innerText === "Don't have an account?" ||
    props.innerText === "Sign Up" ||
    props.innerText === "Already have an account?" ||
    props.innerText === "Sign In" ||
    props.innerText === "Did you remember your password?" ||
    props.innerText === "Try logging in"
      ? "600"
      : "500"};
  font-size: ${(props) => (props.innerText === "Sign Up" || props.innerText === "Sign In" ? "16px" : "14px")};
  line-height: ${(props) =>
    props.innerText === "Don't have an account?" ||
    props.innerText === "Sign Up" ||
    props.innerText === "Already have an account?" ||
    props.innerText === "Sign In" ||
    props.innerText === "Did you remember your password?" ||
    props.innerText === "Try logging in"
      ? "24px"
      : "17px"};
  text-align: center;
  opacity: ${(props) =>
    props.innerText === "Don't have an account?" ||
    props.innerText === "Already have an account?" ||
    props.innerText === "Did you remember your password?"
      ? "0.5"
      : null};
  color: ${(props) =>
    props.innerText === "Sign Up" || props.innerText === "Sign In" || props.innerText === "Try logging in"
      ? "#366EFF"
      : "#000000"};
  text-decoration-line: ${(props) =>
    props.innerText === "Sign Up" || props.innerText === "Sign In" || props.innerText === "Try logging in"
      ? "underline"
      : "null"};
`

const ForgotPassWrapper = styled.div<Pick<TextLinkBlockPropsType, "innerText">>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.innerText === "Forgot password?" ? "row-reverse" : "column")};
  margin-bottom: ${(props) => (props.innerText === "Forgot password?" ? "69px" : "11px")};
  align-items: center;
`
export type TextLinkBlockPropsType = {
  innerText:
    | "Forgot password?"
    | "Don't have an account?"
    | "Sign Up"
    | "Already have an account?"
    | "Sign In"
    | "Forgot your password?"
    | "Did you remember your password?"
    | "Try logging in"
    | "Send Instructions"
    | "Create new password"
    | "Back to login"
}
export const TextLinkBlock = ({ innerText }: TextLinkBlockPropsType) => {
  const navigate = useNavigate()

  const link = links.find((el) => el.innerText === innerText)?.link

  const onClickHandler = () => {
    if (link) navigate(link)
  }

  return (
    <ForgotPassWrapper innerText={innerText}>
      <ForgotPassLink innerText={innerText} onClick={link ? onClickHandler : undefined}>
        {innerText}{" "}
      </ForgotPassLink>
    </ForgotPassWrapper>
  )
}

export type TextInstructionsType =
  | typeof createNewPassInstructions
  | typeof forgotPassInstructions
  | typeof checkEmailInstructions

export type TextBlockPropsType = {
  text: TextInstructionsType
} & Pick<FormPropsType, "email">

export const TextBlock = ({ text, email }: TextBlockPropsType) => {
  const marginBottomPX = generateMargin(text)
  console.log(email)

  return (
    //props for creating div with default value
    <ForgotPassWrapper innerText="Sign In">
      <SpanText marginBottom={marginBottomPX}>
        {text}
        {email ? email : null}
      </SpanText>
    </ForgotPassWrapper>
  )
}

const generateMargin = (text: TextInstructionsType) => {
  switch (text) {
    case forgotPassInstructions:
      return "65px"
    case checkEmailInstructions:
      return "41px"
    case createNewPassInstructions:
      return "42px"
    default:
      return "29px"
  }
}

const SpanText = styled.span<{ marginBottom: ReturnType<typeof generateMargin> }>`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: ${(props) => props.marginBottom};
  /* or 171% */
  color: #000000;
  opacity: 0.5;
`
export const S = {
  FormWrapper,
  FormModule,
  TextLinkBlock,
  TextBlock,
}
