import { useLayoutEffect } from "react"
import { useActions, useAppSelector } from "common/hooks"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { PackType } from "../packs.api.types"
import styled from "styled-components"
import { selectorPacks, selectorPageCount, selectorSerchPackName } from "../pack.selector"
import { P } from "./Packs.styled"
import { BasicButton } from "components/Button/BasicButton"
import { SearchInputBlock } from "components/Inputs/SearchInputBlock/SearchInputBlock"
import TogglerButtonBlock from "components/Button/TogglerButtonBlock/TogglerButtonBlock"
import SliderBlock from "components/Slider/SliderBlock/SliderBlock"
import { ClearFilterButton } from "components/Button/ClearFilterButton/ClearFilterButton"
import { TablePacks } from "./PacksTable/TablePacks"
import { selectorIsLoading } from "app/app.selectors"
import { PaginationRounded } from "components/Pagination/Pagination"
import SelectButton from "components/Selector/SelectButton"

export const Packs = () => {
  // DANGER FAKE SELECTOR
  const cardPacks = useAppSelector(selectorPacks)
  const searchPackName = useAppSelector(selectorSerchPackName)
  const isLoading = useAppSelector(selectorIsLoading)
  // const pageCount = useAppSelector(selectorPageCount)
  const { fetchPacks, createPack, removePack, updatePack } = useActions(packsThunks)

  useLayoutEffect(() => {
    fetchPacks()
  }, [])

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random() + "Rassel",
    }
    createPack(newPack)
  }

  const removePackHandler = (id: string) => {
    removePack(id)
  }

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random()
    updatePack({ ...pack, name: newName })
  }

  const searchQuery = useAppSelector(selectorSerchPackName)
  const { changeFilterParams } = useActions(packsActions)

  const changeFilterParamsCallback = (params: string | null) => {
    if (typeof params === "string") {
      changeFilterParams({ packName: params === "" ? "" : params })
    } else {
      changeFilterParams({ packName: params })
    }
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
        <PaginationRounded />
        <P.SpanPageContainer>
          <P.Span>Show</P.Span>
          <SelectButton cardsCount={[10, 20, 30, 40, 50]} />
          <P.Span>Cards per Page</P.Span>
        </P.SpanPageContainer>
      </P.Container>
      {/* <PacksTable packs={cardPacks} /> */}
      {searchPackName && cardPacks.length === 0 && (
        <>"Колоды с введенным название не найдены. Измените параметры запроса"</>
      )}
      <div>
        <h1>Packs</h1>
        <button onClick={addPackHandler}>add pack</button>
        <div>
          {cardPacks.map((p) => {
            return (
              <PacksContainer key={p._id}>
                <p>
                  <b>pack name</b>: {p.name}
                </p>
                <p>
                  <b>cardsCount</b>: {p.cardsCount}
                </p>
                <p>
                  <b>user name</b>: {p.user_name}
                </p>
                <p>
                  <b>user id</b>: {p._id}
                </p>
                <button onClick={() => removePackHandler(p._id)}>remove</button>
                <button onClick={() => updatePackHandler(p)}>update</button>
              </PacksContainer>
            )
          })}
        </div>
      </div>
    </P.Wrapper>
  )
}

const PacksContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
