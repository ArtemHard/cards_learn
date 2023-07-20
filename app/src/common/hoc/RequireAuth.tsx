import { Navigate } from "react-router-dom"
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

// export default function ProtectedRoutes() {
//   const isAuth = useAppSelector(selectorIsAuth)
//   return isAuth ? <Outlet /> : <Navigate to="/sign-in" />
// }
