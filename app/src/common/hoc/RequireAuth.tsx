import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsAuth } from "features/auth/auth.selectors"
import { Auth } from "features/auth/Auth/Auth"

type RequireAuthProps = {
  component: JSX.Element
}
export const RequireAuth = ({ component }: RequireAuthProps): JSX.Element => {
  const isAuth = useAppSelector(selectorIsAuth)
  console.log(isAuth)
  if (!isAuth) {
    return <Navigate to={"/sign-in"} />
  } else return component
}
