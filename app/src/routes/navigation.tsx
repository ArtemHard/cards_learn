import App from "app/App"
import { Learn } from "components/Learn/Learn"
import { Profile } from "components/Profile/Profile"
import { Auth } from "features/auth/Auth/Auth"
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail"
import { ForgotPassword } from "features/auth/ForgotPassword/ForgotPassword"
import { SetNewPassword } from "features/auth/SetNewPassword/SetNewPassword"
import { Cards } from "features/cards/Cards/Cards"
import { Packs } from "features/packs/Packs/Packs"

export type NavRouteType = {
  path: string
  name?: string
  element: JSX.Element
  isPrivate: boolean
  menu: boolean
}

export const nav: NavRouteType[] = [
  {
    path: "sign-in",
    name: "Sign in",
    element: <Auth type="Sign In" key={"sign-in"} />,
    isPrivate: false,
    menu: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "sign-up",
    name: "Sign up",
    element: <Auth type="Sign Up" key={"sign-up"} />,
    isPrivate: false,
    menu: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "check-email",
    element: <CheckEmail />,
    isPrivate: false,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "set-new-password",
    element: <SetNewPassword />,
    isPrivate: false,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    isPrivate: false,
    menu: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "profile",
    name: "Profile",
    element: <Profile />,
    isPrivate: true,
    menu: true,

    // element: <Profile />,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "packs",
    name: "Packs",
    element: <Packs />,
    isPrivate: true,
    menu: true,
  },
  {
    path: "cards/:cardId",
    element: <Cards />,
    isPrivate: true,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "learn/:cardId",
    element: <Learn />,
    isPrivate: true,
    menu: false,
    // ErrorBoundary: ErrorPage,
  },
]
