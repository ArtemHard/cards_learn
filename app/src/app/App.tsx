import { useEffect, useState } from "react"
import { appActions } from "app/app.slice"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Header } from "features/appBar/Header/Header"
import { GlobalError } from "common/components/GlobalError/GlobalError"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "common/hooks"
import "react-toastify/dist/ReactToastify.css"
import {
  selectIsAppInitialized,
  selectIsAuth,
  selectIsAuthName,
  selectorIsLoading,
  selectUnHandleActions,
} from "./app.selectors"
import { Modal } from "features/modals/Modal/Modal"
import { PATH } from "routes/path"

function App() {
  // const isLoading = useAppSelector((state) => state.app.isLoading)
  const isAuth = useAppSelector(selectIsAuth)
  const isLoading = useAppSelector(selectorIsLoading)
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  // const unHandleActions = useAppSelector(selectUnHandleActions)
  const dispatch = useAppDispatch()
  console.log("RENDER APP")

  useEffect(() => {
    // console.log(document.location.pathname)
    // if (!isAuth) {
    //   if (document.location.pathname !== "/" + PATH.LOGIN || document.location.pathname !== "/" + PATH.REGISTRATION)
    //     <Navigate to={PATH.LOGIN} />
    //   // navigate(PATH.LOGIN)
    // }
    // if (isAuth) <Navigate to={PATH.PACKS} />
    // navigate(PATH.PACKS)
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }))
    }, 3000)
  }, [isAuth])
  return (
    <div className="App">
      <Header />
      <Modal />
      <GlobalError />
      {isLoading && <LinearProgress />}
      <div>{!isAppInitialized && <Outlet />}</div>
    </div>
  )
}

export default App
