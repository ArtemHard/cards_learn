import { RootState } from "app/store"

export const selectorIsAuth = (state: RootState) => state.auth.profile?.name
export const selectorSendEmail = (state: RootState) => state.auth.sendEmail
