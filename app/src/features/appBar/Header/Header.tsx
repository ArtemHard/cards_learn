import { useAppDispatch, useAppSelector } from "app/hooks"
import { authThunk } from "features/auth/auth.slice"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.profile?.name)
  const dispatch = useAppDispatch()
  let location = useLocation()
  console.log(location.pathname === "/sign-in")

  const navigate = useNavigate()
  const onClickHandler = () => {
    if (!isAuth) navigate("/sign-in")
    if (isAuth) dispatch(authThunk.logOut())
  }
  return (
    <HeaderContainer>
      <h1>IT-incuba</h1>
      <button onClick={onClickHandler}>{isAuth ? "Log Out" : "Log In"}</button>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 136px;
  padding-left: 136px;
  /* left: 0px;
  top: 0px; */

  background: #fcfcfc;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25),
    inset 0px 1px 0px rgba(255, 255, 255, 0.3);
`
