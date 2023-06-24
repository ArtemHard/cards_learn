import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import { selectorUserId } from "features/packs/pack.selector"

export const selectCards = (state: RootState) => state.cards.cards
export const selectPackName = (state: RootState) => state.cards.packName
export const selectPackLength = (state: RootState) => state.cards.cards.length
export const selectCardsPageCount = (state: RootState) => state.cards.pageCount
export const selectCardsPage = (state: RootState) => state.cards.page
export const selectCardsTotalCount = (state: RootState) => state.cards.cardsTotalCount

export const selectPackUserId = (state: RootState) => state.cards.packUserId
export const selectCardsSearhQuestion = (state: RootState) => state.cards.filterParams.cardQuestion

export const selectIsUserPack = createSelector(
  selectPackUserId,
  selectorUserId,
  (packUserId, userId) => packUserId === userId
)
