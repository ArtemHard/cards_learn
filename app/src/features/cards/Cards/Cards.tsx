import React from "react"
import { P } from "../../packs/Packs/Packs.styled"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import styled from "styled-components"
import { useAppSelector } from "common/hooks"
import { selectPackName } from "../cards.selector"
import { TextLinkBlock } from "components/Form/Form.styled"
import { emptyPackAlertText } from "common/constants"
import { BasicButton } from "components/Button/BasicButton"

export const Cards = () => {
  const packName = useAppSelector(selectPackName)
  return (
    <P.Wrapper>
      <P.Container justifyContent="flex-start">
        <BackNavigateContainer onClick={() => alert("NAVIGATE BACK")}>
          <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "8px" }} />
          <Span>Back to Packs List</Span>
        </BackNavigateContainer>
      </P.Container>
      <P.Container>
        <P.Title>{packName}</P.Title>
      </P.Container>
      <P.Container>
        <EmptyPack />
      </P.Container>
    </P.Wrapper>
  )
}

const EmptyPack = () => {
  return (
    <EmptyPackWrapper>
      <TextLinkBlock innerText={emptyPackAlertText}></TextLinkBlock>
      <BasicButton buttonText="Add new card" width="171px" />
    </EmptyPackWrapper>
  )
}

const EmptyPackWrapper = styled.div`
  width: 100%;
  margin-top: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Span = styled.span`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height */

  color: #000000;
`
const BackNavigateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid black;
  }
`
