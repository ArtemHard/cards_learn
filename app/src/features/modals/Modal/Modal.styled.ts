import styled from "styled-components"

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
const TitleContainer = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  padding: 19px 24px 19px 24px;
  border-bottom: 1px solid #d9d9d9;
`
const QuestionWrapper = styled.div`
  max-width: 395px;
  margin: 29px 24px 29px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & * {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`
const BoldText = styled.strong`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const ButtonGroupWrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 42px;
`

type ButtonTextProps = {
  color: string
}
const ButtonText = styled.span<ButtonTextProps>`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: ${(props) => (props.color ? props.color : "white")};
`

const FormModal = styled.form.attrs({
  type: "submit",
})`
  box-sizing: border-box;
  padding: 23px 21px;
  display: flex;
  flex-direction: column;
  width: 395px;
  margin: 0;
`

const CheckBoxText = styled.span`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-align: center;
`

export const MS = {
  Title,
  TitleContainer,
  QuestionWrapper,
  BoldText,
  ButtonWrapper,
  ButtonText,
  FormModal,
  CheckBoxText,
  ButtonGroupWrapper,
}
