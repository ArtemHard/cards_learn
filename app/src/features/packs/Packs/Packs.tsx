import { useLayoutEffect } from "react"
import { useActions, useAppSelector } from "common/hooks"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { PackType } from "../packs.api.types"
import styled from "styled-components"
import {
  selectorPacks,
  selectorPacksTotalCount,
  selectorPage,
  selectorPageCount,
  selectorSearchPackName,
} from "../pack.selector"
import { P } from "./Packs.styled"
import { BasicButton } from "components/Button/BasicButton"
import { SearchInputBlock } from "components/Inputs/SearchInputBlock/SearchInputBlock"
import TogglerButtonBlock from "components/Button/TogglerButtonBlock/TogglerButtonBlock"
import SliderBlock from "components/Slider/SliderBlock/SliderBlock"
import { ClearFilterButton } from "components/Button/ClearFilterButton/ClearFilterButton"
import { TablePacks } from "./PacksTable/TablePacks"
import { selectorIsLoading } from "app/app.selectors"
import SelectButtonPaginator from "components/Selector/SelectButtonPaginator"
import { PaginationCommon } from "components/Pagination/PaginationCommon"
import { User } from "features/users/User"
import { useGetCardsQuery } from "features/cards/services/cards.api"
import { modalActions } from "features/modals/modal.slice"

export const Packs = () => {
  // DANGER FAKE SELECTOR
  const cardPacks = useAppSelector(selectorPacks)
  const packsTotalCount = useAppSelector(selectorPacksTotalCount)
  const searchPackName = useAppSelector(selectorSearchPackName)
  const isLoading = useAppSelector(selectorIsLoading)
  const pageCount = useAppSelector(selectorPageCount)
  const page = useAppSelector(selectorPage)
  const { fetchPacks, createPack, removePack, updatePack } = useActions(packsThunks)
  const { setDataModal, toggleModal } = useActions(modalActions)

  useLayoutEffect(() => {
    fetchPacks()
  }, [])

  const addPackHandler = () => {
    setDataModal({ _id: "", type: "Pack", answer: "", name: "", question: "" })
    toggleModal({ isCreateNew: true })
    // createPack(newPack)
  }

  const removePackHandler = (id: string) => {
    removePack(id)
  }

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random()
    updatePack({ ...pack, name: newName })
  }

  const searchQuery = useAppSelector(selectorSearchPackName)
  const { changeFilterParams } = useActions(packsActions)

  const changeFilterParamsCallback = (params: string | null) => {
    if (typeof params === "string") {
      changeFilterParams({ packName: params === "" ? "" : params })
    } else {
      changeFilterParams({ packName: params })
    }
  }
  const changePage = (page: number) => {
    changeFilterParams({ page })
    fetchPacks()
  }
  const changePageCount = (pageCount: number) => {
    changeFilterParams({ pageCount })
    fetchPacks()
  }

  return (
    <P.Wrapper>
      <P.Container key={"header"}>
        <P.Title>Packs list</P.Title>
        <BasicButton
          width="175px"
          buttonText="Add new pack"
          marginBottom="8px"
          onClick={addPackHandler}
          isLoading={isLoading}
        />
      </P.Container>
      <P.Container key={"params"}>
        <P.ParamContainer key={"search"}>
          <SearchInputBlock
            changeFilterParams={changeFilterParamsCallback}
            searchQuery={searchQuery}
            fetch={fetchPacks}
          />
        </P.ParamContainer>
        <TogglerButtonBlock />
        <SliderBlock />
        <ClearFilterButton />
      </P.Container>
      <TablePacks packs={cardPacks} />
      <P.Container key={"paginator"} justifyContent={"flex-start"}>
        <PaginationCommon
          cardPacksTotalCount={packsTotalCount}
          page={page}
          pageCount={pageCount}
          changeFilterParams={changePage}
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
      {searchPackName && cardPacks.length === 0 && (
        <>"Колоды с введенным название не найдены. Измените параметры запроса"</>
      )}
    </P.Wrapper>
  )
}
