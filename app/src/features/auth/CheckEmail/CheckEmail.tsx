import { useAppSelector } from "common/hooks"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export const CheckEmail = () => {
  const navigate = useNavigate()
  const email = useAppSelector((state) => state.auth.sendEmail)
  return (
    <CheckEmailWrapper>
      <CheckEmailContainer>
        <h1>CheckEmail</h1>
        <Img />
        <span>{`We've sent an Email with Instructions to ` + email} </span>
        <button onClick={() => navigate("/sign-in")}>Back to login</button>
      </CheckEmailContainer>
    </CheckEmailWrapper>
  )
}

const CheckEmailWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CheckEmailContainer = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 413px;
  height: 408px;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

const Img = styled.img.attrs({
  src: "",
  alt: "conver with opend letter",
})`
  width: 108px;
  height: 108px;
  background-color: #00bbff;
`
