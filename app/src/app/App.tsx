import { useEffect } from "react"
import { appActions } from "app/app.slice"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { Counter } from "features/counter/Counter"
import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "features/appBar/Header/Header"

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const isAuth = useAppSelector((state) => state.auth.profile?.name)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  console.log(!!isAuth)

  useEffect(() => {
    if (!isAuth) navigate("/sign-in")
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }))
    }, 3000)
  }, [isAuth])
  return (
    <div className="App">
      <Header />
      {isLoading && <h1>Loader...</h1>}
      {/* <Counter /> */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
