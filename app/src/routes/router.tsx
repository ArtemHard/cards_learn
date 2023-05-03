import { createBrowserRouter } from "react-router-dom"
import { SignUp } from "features/auth/SignUp/SignUp"
import { CheckEmail } from "components/CheckEmail/CheckEmail"
import { SetNewPassword } from "components/SetNewPassword/SetNewPassword"
import { Profile } from "components/Profile/Profile"
import { Packs } from "components/Packs/Packs"
import { Learn } from "components/Learn/Learn"
import App from "app/App"
import ErrorPage from "components/404/ErrorPage"
import { Cards } from "components/Cards/Cards"
import { SignIn } from "features/auth/SignIn/SignIn"
import { ForgotPassword } from "features/auth/ForgotPassword/ForgotPassword"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "sign-up",
        element: <SignUp />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "check-email",
        element: <CheckEmail />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "set-new-password",
        element: <SetNewPassword />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "profile",
        element: <Profile />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "packs",
        element: <Packs />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "cards",
        element: <Cards />,
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "learn/:cardId",
        element: <Learn />,
        // ErrorBoundary: ErrorPage,
      },
    ],
  },
])
