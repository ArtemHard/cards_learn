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
})
