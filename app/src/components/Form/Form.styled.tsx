import styled from "styled-components"
import { FormPropsType } from "./Form"
import { Link, useNavigate } from "react-router-dom"

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
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1),
    -1px -1px 2px rgba(0, 0, 0, 0.1);
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

const ForgotPassLink = styled.span<
  Pick<TextLinkBlockPropsType, "innerText">
>`
  cursor: ${(props) =>
    props.innerText === "Don't have an account?"
      ? null
      : "pointer"};
  display: flex;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: ${(props) =>
    props.innerText ===
    ("Don't have an account?" || "Sign Up")
      ? "600"
      : "500"};
  font-size: ${(props) =>
    props.innerText === "Sign Up" ? "16px" : "14px"};
  line-height: ${(props) =>
    props.innerText ===
    ("Don't have an account?" || "Sign Up")
      ? "24px"
      : "17px"};
  text-align: center;
  opacity: ${(props) =>
    props.innerText === "Don't have an account?"
      ? "0.5"
      : null};
  color: ${(props) =>
    props.innerText === "Sign Up" ? "#366EFF" : "#000000"};
  text-decoration-line: ${(props) =>
    props.innerText === "Sign Up" ? "underline" : "null"};
`

const ForgotPassWrapper = styled.div<
  Pick<TextLinkBlockPropsType, "innerText">
>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.innerText === "Forgot password?"
      ? "row-reverse"
      : "column"};
  margin-bottom: ${(props) =>
    props.innerText === "Forgot password?"
      ? "69px"
      : "11px"};
  align-items: center;
`
type TextLinkBlockPropsType = {
  innerText:
    | "Forgot password?"
    | "Don't have an account?"
    | "Sign Up"
    | "ALready have an account?"
    | "Sign In"
}
export const TextLinkBlock = ({
  innerText,
}: TextLinkBlockPropsType) => {
  const navigate = useNavigate()
  const onClickHandler = () => {
    if (innerText === "Don't have an account?") {
      return null
    } else
      navigate(
        links.find((el) => el.innerText === innerText)!.link
      )
  }
  return (
    <ForgotPassWrapper innerText={innerText}>
      <ForgotPassLink
        innerText={innerText}
        onClick={onClickHandler}
      >
        {innerText}{" "}
      </ForgotPassLink>
    </ForgotPassWrapper>
  )
}
export const S = {
  FormWrapper,
  FormModule,
  TextLinkBlock,
}
