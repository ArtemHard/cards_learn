import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsAuth } from "features/auth/auth.selectors"
import { PATH } from "routes/path"

type RequireAuthProps = {
  component: JSX.Element
}
export const RequireAuth = ({ component }: RequireAuthProps): JSX.Element => {
  const isAuth = useAppSelector(selectorIsAuth)
  const navigate = useNavigate()
  if (!isAuth) {
    //condition for right render form auth(logIn or sign in) and not rerender app
    if (document.location.pathname !== "/" + PATH.LOGIN || document.location.pathname !== "/" + PATH.REGISTRATION)
      return <Navigate to={"/sign-in"} />
    else return component
  } else return component
}
