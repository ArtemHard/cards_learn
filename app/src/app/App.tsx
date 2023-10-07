import { useEffect, useState } from "react"
import { appActions } from "app/app.slice"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Header } from "features/appBar/Header/Header"
import { GlobalError } from "common/components/GlobalError/GlobalError"
import LinearProgress from "@mui/material/LinearProgress"
import { useActions, useAppDispatch, useAppSelector } from "common/hooks"
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
import { authThunk } from "features/auth/auth.slice"
import { globalNavigate } from "common/utils/GlobalNavigate"

function App() {
  const isAuth = useAppSelector(selectIsAuth)
  const isLoading = useAppSelector(selectorIsLoading)
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  const { setAppInitialized } = useActions(appActions)
  const { authMe } = useActions(authThunk)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   // console.log(document.location.pathname)
  //   // if (!isAuth) {
  //   //   if (document.location.pathname !== "/" + PATH.LOGIN || document.location.pathname !== "/" + PATH.REGISTRATION)
  //   //     <Navigate to={PATH.LOGIN} />
  //   //   // navigate(PATH.LOGIN)
  //   // }
  //   // if (isAuth) <Navigate to={PATH.PACKS} />
  //   // navigate(PATH.PACKS)
  //   // setTimeout(() => {
  //   //   dispatch(appActions.setIsLoading({ isLoading: false }))
  //   // }, 3000)
  //   // if (!isAuth) authMe()
  //   if (!isAuth) {
  //     authMe()
  //       .unwrap()
  //       .then(() => {
  //         if (isAuth) {
  //           if (document.location.pathname === PATH.LOGIN || document.location.pathname === PATH.REGISTRATION)
  //             navigate(PATH.PACKS)
  //         }
  //       })
  //       .catch(() => {
  //         navigate(PATH.LOGIN)
  //       })
  //       .finally(() => {
  //         setAppInitialized(true)
  //       })
  //   }
  // }, [])
  useEffect(() => {
    if (!isAuth) {
      authMe()
        .unwrap()
        .catch(() => globalNavigate(PATH.LOGIN))
    }
  }, [])
  return (
    <div className="App">
      <Header />
      <Modal />
      <GlobalError />
      {isLoading && <LinearProgress />}
      {/* <div>{isAppInitialized && <Outlet />}</div> */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
