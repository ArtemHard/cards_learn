import { useEffect } from "react"
import {
  useAppDispatch,
  useAppSelector,
} from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import s from "./styles.module.css"
import { PackType } from "../packs.api.types"
import styled from "styled-components"
import {
  filterByNamePacksSelector,
  selectorPacks,
} from "../pack.selector"

export const Packs = () => {
  console.log("Packs render")

  const cardPacks = useAppSelector(
    filterByNamePacksSelector
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(packsThunks.fetchPacks())
  }, [])

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random(),
    }
    dispatch(packsThunks.createPack(newPack))
  }

  const removePackHandler = (id: string) => {
    dispatch(packsThunks.removePack(id))
  }

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random()
    dispatch(
      packsThunks.updatePack({ ...pack, name: newName })
    )
  }

  return (
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
              <button
                onClick={() => removePackHandler(p._id)}
              >
                remove
              </button>
              <button onClick={() => updatePackHandler(p)}>
                update
              </button>
            </PacksContainer>
          )
        })}
      </div>
    </div>
  )
}

const PacksContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
