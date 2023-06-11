import SuperEditableSpan from "common/components/EditableSpan/EditableSpan"
import { useAppSelector, useAppDispatch } from "common/hooks"
import { selectProfileData } from "common/utils/selectors/authSelectors"
import { authThunk } from "features/auth/auth.slice"
import React from "react"
import styled from "styled-components"

export const Profile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfileData)
  const onClickHandler = () => {
    dispatch(authThunk.logOut())
  }
  return (
    <ProfileWrapper>
      <ProfileContainer>
        <h1>Personal Information</h1>
        <Avatar />
        <ProfileName>{profile?.name}</ProfileName>
        <span>{profile?.email}</span>
        <button onClick={onClickHandler}>Log Out</button>
      </ProfileContainer>
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ProfileContainer = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 413px;
  height: 360px;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

const Avatar = styled.img.attrs<{ src: string }>((props) => ({
  src: props.src || undefined,
}))`
  background-color: black;
  object-fit: cover;
  border-radius: 50%;
  height: 96px;
  width: 96px;
`

const ProfileName = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`
