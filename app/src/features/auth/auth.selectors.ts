import { RootState } from "app/store"

export const selectorIsAuth = (state: RootState) => state.auth.profile?.name
