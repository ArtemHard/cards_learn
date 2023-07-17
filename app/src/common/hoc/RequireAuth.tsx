import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsAuth } from "features/auth/auth.selectors"

type RequireAuthProps = {
  component: JSX.Element
}
export const RequireAuth = ({ component }: RequireAuthProps): JSX.Element => {
  const isAuth = useAppSelector(selectorIsAuth)
  if (!isAuth) {
    return <Navigate to={"/sign-in"} />
  } else return component
}
