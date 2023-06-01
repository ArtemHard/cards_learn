import { RootState } from "app/store"

export const selectorPacks = (state: RootState) =>
  state.packs.cardPacks

export const filterByNamePacksSelector = (
  state: RootState
) => {
  return state.packs.cardPacks.filter((pack) => {
    return pack.name.includes("bad")
  })
}
