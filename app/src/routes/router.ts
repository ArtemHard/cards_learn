import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "components/404/ErrorPage";
import { SignIn } from "components/SignIn/SignIn";
import { SignUp } from "components/SignUp/SignUp";
import { CheckEmail } from "components/CheckEmail/CheckEmail";
import { SetNewPassword } from "components/SetNewPassword/SetNewPassword";
import { ForgotPassword } from "components/ForgotPassword/ForgotPassword";
import { Profile } from "components/Profile/Profile";
import { Packs } from "components/Packs/Packs";
import { Cards } from "components/Cards/Cards";
import { Learn } from "components/Learn/Learn";
import { Main } from "Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: Main(),
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: "sign-in",
        element: SignIn(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "sign-up",
        element: SignUp(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "check-email",
        element: CheckEmail(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "set-new-password",
        element: SetNewPassword(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "forgot-password",
        element: ForgotPassword(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "profile",
        element: Profile(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "packs",
        element: Packs(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "cards",
        element: Cards(),
        // ErrorBoundary: ErrorPage,
      },
      {
        path: "learn/:cardId",
        element: Learn(),
        // ErrorBoundary: ErrorPage,
      },
    ],
  },
]);
