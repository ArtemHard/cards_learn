import { authReducer, authThunk } from "./auth.slice"

export default 1

describe("auth slice Reducer test", () => {
  const initialState = {
    profile: null,
    sendEmail: null,
    authError: "",
  }
  const data = {
    email: "safrondev1@gmail.com",
    password: "1qazxcvBG",
    rememberMe: false,
  }
  const profile = {
    _id: "6435620aaf58963e887fb0f4",
    email: "safrondev1@gmail.com",
    rememberMe: false,
    isAdmin: false,
    name: "safrondev1@gmail.com",
    verified: false,
    publicCardPacksCount: 3,
    created: "2023-04-11T13:35:06.046Z",
    updated: "2023-05-05T06:35:21.310Z",
    __v: 0,
    token: "023f67e0-eb0f-11ed-b359-fbf835b5a380",
    tokenDeathTime: 1683279321310,
  }
  it("should login work correctly and return profile", () => {
    // 1. Если мы проверяем успешный кейс, тогда пишем fulfilled (authThunks.login.fulfilled)
    // 2. fulfilled принимает 3 параметра
    // 2.1. То, что thunk возвращает
    // 2.2. Ожидает строку. Будем везде писать "requestId" - meta информация.
    // 2.3. То, что thunk принимает
    const action = authThunk.login.fulfilled(
      { profile },
      "requestId",
      data
    )

    const state = authReducer(initialState, action)

    expect(state.profile).toEqual(profile)
  })
})
