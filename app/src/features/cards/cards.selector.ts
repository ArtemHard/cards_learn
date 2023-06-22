import { RootState } from "app/store"

export const selectCards = (state: RootState) => state.cards.cards
export const selectPackName = (state: RootState) => state.cards.packName
