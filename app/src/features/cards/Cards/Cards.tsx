import { useEffect } from "react"
import { P } from "../../packs/Packs/Packs.styled"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import styled from "styled-components"
import { useActions, useAppSelector } from "common/hooks"
import {
  selectorCardsPage,
  selectorCardsPageCount,
  selectorCardsSearhQuestion,
  selectorCardsTotalCount,
  selectIsUserPack,
  selectorPackLength,
  selectorPackName,
  selectorCards,
} from "../cards.selector"
import { TextLinkBlock } from "components/Form/Form.styled"
import { emptyFriendPackAlertText, emptyUserPackAlertText } from "common/constants"
import { BasicButton } from "components/Button/BasicButton"
import { useNavigate, useParams } from "react-router-dom"
import { cardsActions, cardsThunks } from "../cards.slice"
import { SearchInputBlock } from "components/Inputs/SearchInputBlock/SearchInputBlock"
import { TableCards } from "features/cards/Cards/TableCards/TableCards"
import { PaginationCommon } from "components/Pagination/PaginationCommon"
import SelectButtonCommon from "components/Selector/SelectButtonCommon"
import MoreIcon from "@mui/icons-material/MoreVert"
import IconButton from "@mui/material/IconButton"
import { MoreTools } from "components/MoreTools/MoreTools"

export type headerTableParamsType = {
  dataParams: string
  text: string
  align: "left" | "center" | "right"
}
const headerTableParams: headerTableParamsType[] = [
  { dataParams: "name", text: "Question", align: "left" },
  { dataParams: "cardsCount", text: "Answer", align: "center" },
  { dataParams: "updated", text: "Last Updated", align: "center" },
  { dataParams: "user_name", text: "Grade", align: "right" },
]

export const Cards = () => {
  const { cardId: packId } = useParams()
  const packName = useAppSelector(selectorPackName)
  const cardsLength = useAppSelector(selectorPackLength)
  const cards = useAppSelector(selectorCards)
  const isUserPack = useAppSelector(selectIsUserPack)
  const searchParamsQuestion = useAppSelector(selectorCardsSearhQuestion)
  const { fetchCards, createCard } = useActions(cardsThunks)
  const { changeFilterParams, clearFilter } = useActions(cardsActions)

  const pageCount = useAppSelector(selectorCardsPageCount)
  const page = useAppSelector(selectorCardsPage)
  const cardsTotalCount = useAppSelector(selectorCardsTotalCount)

  const onClickHandler = () => {
    if (isUserPack && packId) {
      const temproraryData = {
        cardsPack_id: packId,
        question: "how long you need to create app?",
        answer: "more than 1 month",
        grade: 3,
      }
      createCard(temproraryData)
        .unwrap()
        .then(() => fetchCards())
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

  const changePageCallback = (page: number) => {
    changeFilterParams({ page })
    fetchCards()
  }

  const changePageCount = (pageCount: number) => {
    changeFilterParams({ pageCount })
    fetchCards()
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (packId) {
      changeFilterParams({ cardsPack_id: packId })
      fetchCards()
    }
    return () => {
      clearFilter()
    }
  }, [])

  console.log(packName)

  return (
    <P.Wrapper>
      <P.Container key={"navigation"} justifyContent="flex-start">
        <BackNavigateContainer onClick={() => navigate("/packs")}>
          <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "8px" }} />
          <Span>Back to Packs List</Span>
        </BackNavigateContainer>
      </P.Container>

      <P.Container key={"header"} justifyContent="space-between">
        <P.Title>
          {packName} <MoreTools packId={packId} />
          {/* <IconButton
            onClick={() => alert("action")}
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton> */}
        </P.Title>
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

      <P.Container>{!!cardsLength && <TableCards headerParams={headerTableParams} data={cards} />}</P.Container>
      {!cardsLength && searchParamsQuestion === null && (
        <P.Container>
          <EmptyPack />
        </P.Container>
      )}
      {!!searchParamsQuestion && cardsLength === 0 && <h1> В данной колоде нету карточек удовлетворяющих поиску</h1>}
      {!!cardsLength && (
        <P.Container key={"paginator"} justifyContent={"flex-start"}>
          <PaginationCommon
            page={page}
            pageCount={pageCount}
            cardPacksTotalCount={cardsTotalCount}
            changeFilterParams={changePageCallback}
          />
          <P.SpanPageContainer>
            <P.Span>Show</P.Span>
            <SelectButtonCommon
              pageCount={pageCount}
              changePageCount={changePageCount}
              cardsCount={[10, 20, 30, 40, 50]}
            />
            <P.Span>Cards per Page</P.Span>
          </P.SpanPageContainer>
        </P.Container>
      )}
    </P.Wrapper>
  )
}

const EmptyPack = () => {
  const isUserPack = useAppSelector(selectIsUserPack)

  return (
    <EmptyPackWrapper>
      <TextLinkBlock innerText={isUserPack ? emptyUserPackAlertText : emptyFriendPackAlertText}></TextLinkBlock>
      {isUserPack && <BasicButton buttonText="Add new card" width="171px" onClick={() => alert(" card ACTION")} />}
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
