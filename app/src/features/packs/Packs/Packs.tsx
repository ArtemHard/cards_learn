import { useEffect, useLayoutEffect } from "react"
import { useActions, useAppDispatch, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { PackType } from "../packs.api.types"
import styled from "styled-components"
import { selectorPacks, selectorSerchPackName } from "../pack.selector"
import { P } from "./Packs.styled"
import { BasicButton } from "components/Button/BasicButton"
import Autocomplete from "@mui/material/Autocomplete"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { SearchInputBlock } from "components/Inputs/SearchInputBlock/SearchInputBlock"
import TogglerButtonBlock from "components/Button/TogglerButtonBlock/TogglerButtonBlock"
import RangeSlider from "components/Slider/Slider"
import SliderBlock from "components/Slider/SliderBlock/SliderBlock"
import { ClearFilterButton } from "components/Button/ClearFilterButton/ClearFilterButton"
import { PacksTable } from "./PacksTable/PacksTable"
import { TableContent } from "./PacksTable/TableContent"

export const Packs = () => {
  // DANGER FAKE SELECTOR
  const cardPacks = useAppSelector(selectorPacks)
  const searchPackName = useAppSelector(selectorSerchPackName)
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

  return (
    <P.Wrapper>
      <P.Container key={"header"}>
        <P.Title>Packs list</P.Title>
        <BasicButton width="175px" buttonText="Add new pack" marginBottom="8px" onClick={() => alert("ADD ACTION")} />
      </P.Container>
      <P.Container key={"params"}>
        <SearchInputBlock />
        <TogglerButtonBlock />
        <SliderBlock />
        <ClearFilterButton />
      </P.Container>
      <TableContent packs={cardPacks} />
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
