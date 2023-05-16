import { useEffect, useState } from "react"
import { appActions } from "app/app.slice"
import { Counter } from "features/counter/Counter"
import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "features/appBar/Header/Header"
import { GlobalError } from "common/components/GlobalError/GlobalError"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "common/hooks"
import "react-toastify/dist/ReactToastify.css"

function App() {
  // const isLoading = useAppSelector((state) => state.app.isLoading)
  const isAuth = useAppSelector((state) => state.auth.profile?.name)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const unHandleActions = useAppSelector((state) => state.app.unHandleActions)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   // WARNING NEEDD TO UNCOMMENT
  //   // if (!isAuth) navigate("/sign-in")
  //   setTimeout(() => {
  //     dispatch(appActions.setIsLoading({ isLoading: false }))
  //   }, 3000)
  // }, [isAuth])
  return (
    <div className="App">
      <Header />
      <button onClick={() => navigate("/sign-in")}>sign-in</button>
      <button onClick={() => navigate("/sign-up")}>sign-up</button>
      <button onClick={() => navigate("/check-email")}>check-email</button>
      <button onClick={() => navigate("/set-new-password")}>
        set-new-password
      </button>
      <button onClick={() => navigate("/forgot-password")}>
        forgot-password
      </button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <GlobalError />
      {isLoading && <LinearProgress />}
      {/* <Counter /> */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
