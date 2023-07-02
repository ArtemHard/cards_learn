import { useAppSelector, useAppDispatch, useActions } from "common/hooks"
import { authThunk } from "features/auth/auth.slice"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { ButtonBase } from "@mui/material"
import { BasicButton } from "components/Button/BasicButton"

const settings = [
  { text: "Profile", link: "/profile" },
  { text: "Logout", link: undefined },
]

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.profile?.name)
  const navigate = useNavigate()
  const { logOut } = useActions(authThunk)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fcfcfc", alignItems: "center" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              // display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            IT-INCUBA
          </Typography>
          {isAuth ? (
            <Box sx={{ flexGrow: 0 }}>
              <Typography
                variant="h5"
                noWrap
                component="span"
                // href=""
                sx={{
                  mr: 1,
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  borderBottom: "2px dashed",
                  // letterSpacing: ".3rem",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {isAuth}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => (setting.link ? navigate(setting.link) : logOut())}>
                      {setting.text}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <BasicButton marginBottom="8px" width="113px" buttonText="Sign In" onClick={() => navigate("/sign-in")} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
