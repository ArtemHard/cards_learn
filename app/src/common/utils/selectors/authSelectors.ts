import { RootState } from "app/store"
import { ProfileType } from "features/auth/auth.api"

export const selectProfileData = (state: RootState) => {
  return state.auth.profile
}
