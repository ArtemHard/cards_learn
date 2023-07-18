import { RootState } from "./store"

export const selectIsAuthName = (state: RootState) => state.auth.profile?.name
export const selectIsAuth = (state: RootState) => !!state.auth.profile?.name
export const selectorIsLoading = (state: RootState) => state.app.isLoading
export const selectIsAppInitialized = (state: RootState) => state.app.isAppInitialized
export const selectUnHandleActions = (state: RootState) => state.app.unHandleActions
