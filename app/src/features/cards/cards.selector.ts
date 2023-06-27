import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import { selectorUserId } from "features/packs/pack.selector"

export const selectorCards = (state: RootState) => state.cards.cards
export const selectorPackName = (state: RootState) => state.cards.packName
export const selectorPackLength = (state: RootState) => state.cards.cards.length
export const selectorCardsPageCount = (state: RootState) => state.cards.pageCount
export const selectorCardsPage = (state: RootState) => state.cards.page
export const selectorCardsTotalCount = (state: RootState) => state.cards.cardsTotalCount

export const selectorPackUserId = (state: RootState) => state.cards.packUserId
export const selectorCardsSearhQuestion = (state: RootState) => state.cards.filterParams.cardQuestion

export const selectIsUserPack = createSelector(
  selectorPackUserId,
  selectorUserId,
  (packUserId, userId) => packUserId === userId
)
