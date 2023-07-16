import { useEffect } from "react"
import { P } from "../../packs/Packs/Packs.styled"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
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
import { BasicButton } from "components/Button/BasicButton"
import { useNavigate, useParams } from "react-router-dom"
import { cardsActions, cardsThunks } from "../cards.slice"
import { SearchInputBlock } from "components/Inputs/SearchInputBlock/SearchInputBlock"
import { TableCards } from "features/cards/Cards/TableCards/TableCards"
import { PaginationCommon } from "components/Pagination/PaginationCommon"
import SelectButtonPaginator from "components/Selector/SelectButtonPaginator"
import { MoreTools } from "components/MoreTools/MoreTools"
import { selectorIsLoading } from "app/app.selectors"
import { modalActions } from "features/modals/modal.slice"
import { EmptyPack } from "components/EmptyPack/EmptyPack"
import { CardStyle as S } from "./Cards.styled"

export type headerTableParamsType = {
  dataParams: string
  text: string
  align: "left" | "center" | "right"
}
const headerTableParams: headerTableParamsType[] = [
  { dataParams: "question", text: "Question", align: "left" },
  { dataParams: "answer", text: "Answer", align: "center" },
  { dataParams: "updated", text: "Last Updated", align: "center" },
  { dataParams: "grade", text: "Grade", align: "right" },
]

export const Cards = () => {
  const { cardId: packId } = useParams()
  const packName = useAppSelector(selectorPackName)
  const cardsLength = useAppSelector(selectorPackLength)
  const cards = useAppSelector(selectorCards)
  const isUserPack = useAppSelector(selectIsUserPack)
  const searchParamsQuestion = useAppSelector(selectorCardsSearhQuestion)
  const isLoading = useAppSelector(selectorIsLoading)

  const { fetchCards } = useActions(cardsThunks)
  const { changeFilterParams, clearFilter } = useActions(cardsActions)
  const { setDataModal, toggleModal } = useActions(modalActions)
  const pageCount = useAppSelector(selectorCardsPageCount)
  const page = useAppSelector(selectorCardsPage)
  const cardsTotalCount = useAppSelector(selectorCardsTotalCount)

  const openAddNewModal = () => {
    if (isUserPack && packId) {
      setDataModal({ _id: packId, type: "Card", answer: "", name: "", question: "" })
      toggleModal({ isCreateNew: true })
    }
  }

  const onClickHandler = () => {
    if (isUserPack && packId) {
      openAddNewModal()
    } else {
      navigate("/learn/" + packId)
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

  return (
    <P.Wrapper>
      <P.Container key={"navigation"} justifyContent="flex-start">
        <S.BackNavigateContainer onClick={() => navigate("/packs")}>
          <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "8px" }} />
          <S.Span>Back to Packs List</S.Span>
        </S.BackNavigateContainer>
      </P.Container>

      <P.Container key={"header"} justifyContent="space-between">
        <P.Title>
          {packName} <MoreTools packId={packId} />
        </P.Title>
        {(!!cardsLength || isUserPack) && (
          <BasicButton
            buttonText={isUserPack ? "Add new card" : "Learn to pack"}
            width="184px"
            onClick={onClickHandler}
            marginBottom="0px"
            isLoading={isLoading}
          />
        )}
      </P.Container>

      <P.Container key={"params"}>
        <S.ParamContainer>
          <SearchInputBlock
            fetch={fetchCards}
            changeFilterParams={changeFilterParamsCallback}
            searchQuery={searchParamsQuestion}
            width="100%"
          />
        </S.ParamContainer>
      </P.Container>

      <P.Container>{!!cardsLength && <TableCards headerParams={headerTableParams} data={cards} />}</P.Container>
      {!cardsLength && searchParamsQuestion === null && (
        <P.Container>
          <EmptyPack onClickHandler={openAddNewModal} />
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
            <SelectButtonPaginator
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
