import { useAppSelector, useAppDispatch } from "common/hooks"
import { selectProfileData } from "common/utils/selectors/authSelectors"
import { authThunk } from "features/auth/auth.slice"
import styled from "styled-components"
import Avatar from "@mui/material/Avatar"
import { SubmitHandler, useForm } from "react-hook-form"
import * as S from "../Form/Form.styled"
import { BasicButton } from "components/Button/BasicButton"
import FolderIcon from "@mui/icons-material/Folder"
import { staticSrcForEmptyAva } from "common/constants"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"

type PrfileInputType = {
  name: string
}
export const Profile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfileData)
  const onClickHandler = () => {
    dispatch(authThunk.logOut())
  }
  const onSubmit: SubmitHandler<PrfileInputType> = (data) => {
    // callback(data)
    console.warn(data)
  }

  const { control, handleSubmit } = useForm<PrfileInputType>({
    defaultValues: {
      name: profile?.name,
    },
  })
  return (
    <S.FormWrapper>
      <S.FormModule onSubmit={handleSubmit(onSubmit)}>
        <S.TitleForForm>Personal Information</S.TitleForForm>
        <div style={{ height: "100px" }}>
          <Avatar alt="Remy Sharp" src={staticSrcForEmptyAva} sx={{ width: 96, height: 96, borderRadius: "50%" }}>
            {/* <FolderIcon sx={{ position: "relative" }} /> */}
          </Avatar>
          <FolderIcon sx={{ zIndex: 1, position: "relative", top: "-24px", left: "66px", cursor: "pointer" }} />
          <img
            alt="bacgroundForFolder"
            style={{
              position: "relative",
              top: "-21px",
              left: "39px",
              background: "#a1dd78",
              height: "29px",
              width: "29px",
              borderRadius: "50%",
              zIndex: 0,
              opacity: 0.8,
            }}
          ></img>
        </div>
        <NameWrapper>
          <ProfileName>{profile?.name}</ProfileName>
          <BorderColorOutlinedIcon sx={{ cursor: "pointer" }} />
        </NameWrapper>
        <span>{profile?.email}</span>
        <BasicButton type={"button"} onClick={onClickHandler} buttonText="Log Out"></BasicButton>
      </S.FormModule>
    </S.FormWrapper>
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

// const Avatar = styled.img.attrs<{ src: string }>((props) => ({
//   src: props.src || undefined,
// }))`
//   background-color: black;
//   object-fit: cover;
//   border-radius: 50%;
//   height: 96px;
//   width: 96px;
// `

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
