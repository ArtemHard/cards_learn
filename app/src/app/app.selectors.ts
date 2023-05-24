import { RootState } from "./store"

export const selectorIsAuth = (
  state: RootState
) => state.auth.profile?.name
export const selectorIsLoading = (
  state: RootState
) => state.app.isLoading
export const selectorIsAppInitialized = (
  state: RootState
) => state.app.isAppInitialized
export const selectorUnHandleActions = (
  state: RootState
) => state.app.unHandleActions
