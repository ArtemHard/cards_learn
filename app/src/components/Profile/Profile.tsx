/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useCallback } from "react"
import { useAppSelector, useActions } from "common/hooks"
import { selectProfileData } from "common/utils/selectors/authSelectors"
import { authThunk } from "features/auth/auth.slice"
import styled from "styled-components"
import Avatar from "@mui/material/Avatar"
import { Controller, SubmitHandler, useController, useForm } from "react-hook-form"
import * as S from "../Form/Form.styled"
import { BasicButton } from "components/Button/BasicButton"
import { staticSrcForEmptyAva } from "common/constants"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { InputTypeFile } from "components/Inputs/InputTypeFile"
import axios from "axios"
import { Button } from "@mui/material"

export type PrfileInputType = {
  name: string
  file: File
}
export const Profile = () => {
  const { logOut, updateUser } = useActions(authThunk)
  const profile = useAppSelector(selectProfileData)
  const [edit, setEdit] = useState(false)
  const onClickEditMode = (e: any) => {
    setEdit(!edit)
  }

  const onClickHandlerLogOut = () => {
    logOut()
  }
  const onSubmit: SubmitHandler<PrfileInputType> = (data) => {
    if (data.name === profile?.name || data.name.trim() === "") {
      setEdit(!edit)
    } else {
      updateUser(data)
        .unwrap()
        .finally(() => setEdit(!edit))
    }
  }

  const closeEditModeClickHandler = (event: any) => {
    // console.log(event.currentTarget.keyCode)

    if (edit) {
      if (event.target.tagName === "INPUT" || event.target.tagName === "BUTTON") {
      } else {
        reset({ name: profile?.name })
        setEdit(false)
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.currentTarget instanceof HTMLDivElement) {
      if (event.keyCode === 13) {
        handleSubmit(onSubmit)()
      }
      if (event.keyCode === 27) {
        reset({ name: profile?.name })
        setEdit(false)
      }
    }
  }

  const addFileHandler = (fileBase64: string) => {
    updateUser({ avatar: fileBase64 })
  }

  const { control, handleSubmit, reset } = useForm<PrfileInputType>({
    defaultValues: {
      name: profile?.name,
    },
  })
  return (
    <S.FormWrapper>
      <S.FormModule onClick={closeEditModeClickHandler}>
        <S.TitleForForm>Personal Information</S.TitleForForm>
        <div style={{ height: "100px" }}>
          <Avatar
            alt="Remy Sharp"
            src={profile?.avatar ?? staticSrcForEmptyAva}
            sx={{ width: 96, height: 96, borderRadius: "50%" }}
          ></Avatar>
          <InputTypeFile
            type="icon"
            sx={{ zIndex: 1, position: "relative", top: "-30px", left: "56px", cursor: "pointer" }}
            callback={addFileHandler}
          />
        </div>
        <NameWrapper>
          {!edit ? (
            <>
              <ProfileName>{profile?.name}</ProfileName>
              <BorderColorOutlinedIcon onClick={onClickEditMode} sx={{ cursor: "pointer" }} />
            </>
          ) : (
            <>
              <TextInput
                type="text"
                control={control}
                label="Nickname"
                name="name"
                inputProps={{ defaultValue: profile?.name, onKeyDown: handleKeyPress }}
              />
              <Button size="small" variant="contained" onClick={handleSubmit(onSubmit)}>
                save
              </Button>
            </>
          )}
        </NameWrapper>
        <EmailText>{profile?.email}</EmailText>
        <BasicButton type={"button"} onClick={onClickHandlerLogOut} buttonText="Log Out"></BasicButton>
      </S.FormModule>
    </S.FormWrapper>
  )
}

const ProfileName = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  /* margin-top: 30px; */
`
const EmailText = styled.span`
  margin-bottom: 29px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  display: flex;
  align-items: center;

  color: #000000;

  opacity: 0.5;
`
const UnderFolderCircle = styled.div`
  position: relative;
  top: -54px;
  left: 63px;
  background-color: #a1dd78;
  height: 29px;
  width: 29px;
  border-radius: 50%;
  z-index: 0;
  opacity: 0.8;
`
