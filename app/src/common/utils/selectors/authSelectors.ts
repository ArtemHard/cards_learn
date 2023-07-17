import { RootState } from "app/store"
import { ProfileType } from "features/auth/auth.api"

export const selectorProfileData = (state: RootState) => {
  return state.auth.profile
}
export const selectorProfileAvatar = (state: RootState) => {
  return state.auth.profile?.avatar
}
