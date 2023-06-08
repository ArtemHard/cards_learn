import { appActions, appReducer } from "app/app.slice"

describe("app slice", () => {
  const initialState = {
    error: null,
    isLoading: false,
    isAppInitialized: false,
    unHandleActions: [],
  }

  it("should handle correct isLoading value", () => {
    const actual = appReducer(
      initialState,
      appActions.setIsLoading({ isLoading: true })
    )

    expect(actual.isLoading).toBe(true)
  })
  it("should handle setError", () => {
    const action = appActions.setError({ error: "Something went wrong" })
    const state = appReducer(initialState, action)
    expect(state.error).toBe("Something went wrong")
  })
})
