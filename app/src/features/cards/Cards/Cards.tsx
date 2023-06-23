import { useEffect } from "react"
import { P } from "../../packs/Packs/Packs.styled"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import styled from "styled-components"
import { useActions, useAppSelector } from "common/hooks"
import { selectCardsSearhQuestion, selectIsUserPack, selectPackLength, selectPackName } from "../cards.selector"
import { TextLinkBlock } from "components/Form/Form.styled"
import { emptyPackAlertText } from "common/constants"
import { BasicButton } from "components/Button/BasicButton"
import { useNavigate, useParams } from "react-router-dom"
import { cardsActions, cardsThunks } from "../cards.slice"
import { SearchInputBlock } from "components/Inputs/SearchInputBlock/SearchInputBlock"

export const Cards = () => {
  const { cardId } = useParams()
  const packName = useAppSelector(selectPackName)
  const cardsLength = useAppSelector(selectPackLength)
  const isUserPack = useAppSelector(selectIsUserPack)
  const searchParamsQuestion = useAppSelector(selectCardsSearhQuestion)
  const { fetchCards } = useActions(cardsThunks)
  const { changeFilterParams } = useActions(cardsActions)
  const onClickHandler = () => {
    if (isUserPack) {
      alert("Add pack action")
    } else {
      alert("Learn friends pack")
    }
  }

  const changeFilterParamsCallback = (params: string | null) => {
    if (typeof params === "string") {
      changeFilterParams({ cardQuestion: params === "" ? "" : params })
    } else {
      changeFilterParams({ cardQuestion: params })
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (cardId) {
      changeFilterParams({ cardsPack_id: cardId })
      fetchCards()
    }
  }, [])
  return (
    <P.Wrapper>
      <P.Container key={"navigation"} justifyContent="flex-start">
        <BackNavigateContainer onClick={() => navigate("/packs")}>
          <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "8px" }} />
          <Span>Back to Packs List</Span>
        </BackNavigateContainer>
      </P.Container>

      <P.Container key={"header"} justifyContent="space-between">
        <P.Title>{packName}</P.Title>
        {(!!cardsLength || isUserPack) && (
          <BasicButton
            buttonText={isUserPack ? "Add new card" : "Learn to pack"}
            width="184px"
            onClick={onClickHandler}
            marginBottom="0px"
          />
        )}
      </P.Container>
      <P.Container key={"params"}>
        <ParamContainer>
          <SearchInputBlock
            fetch={fetchCards}
            changeFilterParams={changeFilterParamsCallback}
            searchQuery={searchParamsQuestion}
            width="100%"
          />
        </ParamContainer>
      </P.Container>
      {!cardsLength && isUserPack && searchParamsQuestion === "" && searchParamsQuestion === null && (
        <P.Container>
          <EmptyPack />
        </P.Container>
      )}
    </P.Wrapper>
  )
}

const EmptyPack = () => {
  const isUserPack = useAppSelector(selectIsUserPack)
  return (
    <EmptyPackWrapper>
      <TextLinkBlock innerText={emptyPackAlertText}></TextLinkBlock>
      {isUserPack && <BasicButton buttonText="Add new card" width="171px" />}
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
  border-bottom: 2px solid transparent;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid black;
  }
`

const ParamContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  justify-content: space-between;
  width: 100%;
`
