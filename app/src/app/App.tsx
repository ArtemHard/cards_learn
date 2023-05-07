import { useEffect, useState } from "react"
import { appActions } from "app/app.slice"
import { Counter } from "features/counter/Counter"
import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "features/appBar/Header/Header"
import { GlobalError } from "components/GlobalError/GlobalError"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "common/hooks"

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const isAuth = useAppSelector((state) => state.auth.profile?.name)
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
      <Btn />
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

const Btn = () => {
  const [time, setTime] = useState(-1)

  const onClickHandler = () => {
    setTime(5)
  }
  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(time - 1)
      }, 1000)
      return () => clearInterval(timerId)
    }
    if (time === 0) alert("ACTION!")
  }, [time])

  return (
    <button onClick={onClickHandler}>
      {time > 0 ? `before start action: ${time}` : "start ACtion"}
    </button>
  )
}
