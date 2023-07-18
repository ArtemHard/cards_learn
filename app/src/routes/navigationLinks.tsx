import App from "app/App"
import { Learn } from "components/Learn/Learn"
import { Profile } from "components/Profile/Profile"
import { Auth } from "features/auth/Auth/Auth"
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail"
import { ForgotPassword } from "features/auth/ForgotPassword/ForgotPassword"
import { SetNewPassword } from "features/auth/SetNewPassword/SetNewPassword"
import { Cards } from "features/cards/Cards/Cards"
import { Packs } from "features/packs/Packs/Packs"
import { PATH } from "./path"

export type NavRouteType = {
  path: string
  name?: string
  element: JSX.Element
  isPrivate: boolean
  menu: boolean
}

export const nav: NavRouteType[] = [
  {
    path: PATH.LOGIN,
    name: "Sign in",
    element: <Auth type="Sign In" key={"sign-in"} />,
    isPrivate: false,
    menu: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.REGISTRATION,
    name: "Sign up",
    element: <Auth type="Sign Up" key={"sign-up"} />,
    isPrivate: false,
    menu: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.CHECK_EMAIL,
    element: <CheckEmail />,
    isPrivate: false,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.SET_NEW_PASSWORD,
    element: <SetNewPassword />,
    isPrivate: false,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.FORGOT_PASSWORD,
    element: <ForgotPassword />,
    isPrivate: false,
    menu: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.PROFILE,
    name: "Profile",
    element: <Profile />,
    isPrivate: true,
    menu: true,

    // element: <Profile />,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.PACKS,
    name: "Packs",
    element: <Packs />,
    isPrivate: true,
    menu: true,
  },
  {
    path: PATH.CARDS,
    element: <Cards />,
    isPrivate: true,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: PATH.LEARN,
    element: <Learn />,
    isPrivate: true,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
]
