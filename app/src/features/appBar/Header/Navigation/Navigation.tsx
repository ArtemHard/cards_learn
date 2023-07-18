import { useAppSelector } from "common/hooks"
import { selectorIsAuth } from "features/auth/auth.selectors"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import { NavigateFunction, useHref, useLocation, useNavigate } from "react-router-dom"
import { NavRouteType, nav } from "routes/navigationLinks"

type NavigationProps = {
  isAuthName: string | undefined
}

export const Navigation = ({ isAuthName }: NavigationProps) => {
  const navigate = useNavigate()
  let location = useLocation()

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {nav.map((page) => {
        if (page.name && page.menu) {
          if (isAuthName) {
            if (page.isPrivate) {
              return navigateLink(page, navigate, location.pathname)
            } else return null
          }
          return null
        } else return null
      })}
    </Box>
  )
}

const navigateLink = (page: NavRouteType, callback: NavigateFunction, pathname: string) => {
  return (
    <MenuItem key={page.path} onClick={() => callback(page.path)}>
      <Typography
        textAlign="center"
        sx={{ color: "black", textDecoration: pathname === "/" + page.path ? "underline" : undefined }}
      >
        {page.name}
      </Typography>
    </MenuItem>
  )
}
