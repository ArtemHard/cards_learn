import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import {
  checkEmailInstructions,
  createNewPassInstructions,
  emptyFriendPackAlertText,
  emptyUserPackAlertText,
  forgotPassInstructions,
} from "common/constants"
import { FormPropsType } from "./Form"
import emailIcon from "../../common/assets/icons/email-svg.svg"
import { ReactNode } from "react"

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
    props.innerText === "Did you remember your password?" ||
    props.innerText === emptyUserPackAlertText ||
    props.innerText === emptyFriendPackAlertText
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
    props.innerText === "Try logging in" ||
    props.innerText === emptyUserPackAlertText ||
    props.innerText === emptyFriendPackAlertText
      ? "600"
      : "500"};
  font-size: ${(props) => (props.innerText === "Sign Up" || props.innerText === "Sign In" ? "16px" : "14px")};
  line-height: ${(props) =>
    props.innerText === "Don't have an account?" ||
    props.innerText === "Sign Up" ||
    props.innerText === "Already have an account?" ||
    props.innerText === "Sign In" ||
    props.innerText === "Did you remember your password?" ||
    props.innerText === "Try logging in" ||
    props.innerText === emptyUserPackAlertText ||
    props.innerText === emptyFriendPackAlertText
      ? "24px"
      : "17px"};
  text-align: center;
  opacity: ${(props) =>
    props.innerText === "Don't have an account?" ||
    props.innerText === "Already have an account?" ||
    props.innerText === "Did you remember your password?" ||
    props.innerText === emptyUserPackAlertText ||
    props.innerText === emptyFriendPackAlertText
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
    | typeof emptyUserPackAlertText
    | typeof emptyFriendPackAlertText
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
  children?: ReactNode
} & Pick<FormPropsType, "email">

export const TextBlock = ({ text, email, children }: TextBlockPropsType) => {
  const marginBottomPX = generateMargin(text)

  return (
    //props for creating div with default value
    <ForgotPassWrapper innerText="Sign In">
      <SpanText marginBottom={marginBottomPX}>
        {text}
        {children ? children : null}
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

interface SVGIconProps {
  color?: string
  size?: number
  children?: React.ReactNode // добавляем тип children
  viewBox: string
}

const StyledSVG = styled.svg<SVGIconProps>`
  fill: ${(props) => props.color || "currentColor"};
  width: ${(props) => (props.size ? `${props.size}px` : "24px")};
  height: ${(props) => (props.size ? `${props.size}px` : "24px")};
`

const SVGIcon: React.FC<SVGIconProps> = ({ children, ...rest }) => <StyledSVG {...rest}>{children}</StyledSVG>

export default SVGIcon

export const SVGEmail = () => {
  return (
    <div style={{ marginBottom: "31px" }}>
      <SVGIcon size={108} color="#000000" viewBox="0 0 30 30">
        {/* <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> */}
        <title />

        <g id="Complete">
          <g id="mail">
            <g>
              <polyline
                fill="none"
                points="4 8.2 12 14.1 20 8.2"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />

              <rect
                fill="none"
                height="14"
                rx="2"
                ry="2"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                width="18"
                x="3"
                y="6.5"
              />
            </g>
          </g>
        </g>
        {/* </svg> */}
      </SVGIcon>
    </div>
  )
}

// export const S = {
//   FormWrapper,
//   FormModule,
//   TextLinkBlock,
//   TextBlock,
//   SVGEmail,
// }
