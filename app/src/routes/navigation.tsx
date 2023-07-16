import App from "app/App"
import { Learn } from "components/Learn/Learn"
import { Profile } from "components/Profile/Profile"
import { Auth } from "features/auth/Auth/Auth"
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail"
import { ForgotPassword } from "features/auth/ForgotPassword/ForgotPassword"
import { SetNewPassword } from "features/auth/SetNewPassword/SetNewPassword"
import { Cards } from "features/cards/Cards/Cards"
import { Packs } from "features/packs/Packs/Packs"

type NavRouteType = {
  path: string
  // name: string;
  element: JSX.Element
  isPrivate: boolean
}

export const nav: NavRouteType[] = [
  {
    path: "sign-in",
    element: <Auth type="Sign In" key={"sign-in"} />,
    isPrivate: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "sign-up",
    element: <Auth type="Sign Up" key={"sign-up"} />,
    isPrivate: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "check-email",
    element: <CheckEmail />,
    isPrivate: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "set-new-password",
    element: <SetNewPassword />,
    isPrivate: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    isPrivate: false,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "profile",
    element: <Profile />,
    isPrivate: true,

    // element: <Profile />,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "packs",
    element: <Packs />,
    isPrivate: true,
  },
  {
    path: "cards/:cardId",
    element: <Cards />,
    isPrivate: true,
    // ErrorBoundary: ErrorPage,
  },
  {
    path: "learn/:cardId",
    element: <Learn />,
    isPrivate: true,
    // ErrorBoundary: ErrorPage,
  },
]
