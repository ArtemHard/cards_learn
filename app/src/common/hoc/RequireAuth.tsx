import { Navigate } from "react-router-dom"

import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsAuth } from "features/auth/auth.selectors"
import { PATH } from "routes/path"
import { useActions } from "common/hooks"
import { authThunk } from "features/auth/auth.slice"
import { useEffect, useState } from "react"

type RequireAuthProps = {
  component: JSX.Element
}
export const RequireAuth = ({ component }: RequireAuthProps): JSX.Element => {
  const [renderPermission, setRenderPermission] = useState<"Loader" | boolean>("Loader")
  const isAuth = useAppSelector(selectorIsAuth)
  const { authMe } = useActions(authThunk)

  useEffect(() => {
    if (!isAuth) {
      if (document.location.pathname !== PATH.LOGIN || document.location.pathname !== PATH.REGISTRATION) {
        authMe()
          .unwrap()
          .then(() => {
            setRenderPermission(true)
          })
          .catch(() => {
            setRenderPermission(false)
          })
      }
    }
  }, [])

  if (!isAuth) {
    if (renderPermission === "Loader") return <></>
    else if (renderPermission === false) return <Navigate to={"/sign-in"} />
    else return component
  } else return component
}

// export default function ProtectedRoutes() {
//   const isAuth = useAppSelector(selectorIsAuth)
//   return isAuth ? <Outlet /> : <Navigate to="/sign-in" />
// }
