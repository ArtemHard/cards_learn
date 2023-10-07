import { createHashRouter } from "react-router-dom"

import App from "app/App"
import { PageNotFound } from "components/404/ErrorPage"

import { RequireAuth } from "common/hoc/RequireAuth"
import { nav } from "./navigationLinks"
import { GlobalHistory } from "common/utils/GlobalNavigate"

export const router = createHashRouter([
  {
    element: <GlobalHistory />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <App />,
        children: nav.map((el) => {
          return {
            path: el.path,
            element: el.isPrivate ? <RequireAuth component={el.element} /> : el.element,
          }
        }),
      },
    ],
    //   path: "/",
    //   element: <App />,
    //   errorElement: <PageNotFound />,
    //   children: nav.map((el) => {
    //     return {
    //       path: el.path,
    //       element: el.isPrivate ? <RequireAuth component={el.element} /> : el.element,
    //     }
    //   }),
    //   // [
    //   //   {
    //   //     path: "sign-in",
    //   //     element: <Auth type="Sign In" key={"sign-in"} />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "sign-up",
    //   //     element: <Auth type="Sign Up" key={"sign-up"} />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "check-email",
    //   //     element: <CheckEmail />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "set-new-password",
    //   //     element: <SetNewPassword />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "forgot-password",
    //   //     element: <ForgotPassword />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "profile",
    //   //     element: <RequireAuth component={<Profile />} />,

    //   //     // element: <Profile />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "packs",
    //   //     element: <Packs />,
    //   //   },
    //   //   {
    //   //     path: "cards/:cardId",
    //   //     element: <Cards />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   //   {
    //   //     path: "learn/:cardId",
    //   //     element: <Learn />,
    //   //     // ErrorBoundary: ErrorPage,
    //   //   },
    //   // ],
  },
])
