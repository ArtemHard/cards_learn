import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app/store"

export const selectorPacks = (state: RootState) => state.packs.cardPacks
export const selectorUserId = (state: RootState) => state.auth.profile?._id
export const selectorSearchParamsIsUserId = (state: RootState) => state.packs.filterParams.user_id
export const _filterByNamePacksSelector = (state: RootState) => {
  return state.packs.cardPacks.filter((pack) => {
    return pack.name.includes("bad")
  })
}

export const filteredByNamePacksSelector = createSelector(selectorPacks, (packs) => {
  const newPacks = packs.filter((p) => {
    return p.name.includes("w")
  })
  return newPacks
})
