import React from "react"
import styled from "styled-components"
import { BasicModal } from "../BasicModal"
import { useActions, useAppSelector } from "common/hooks"
import {
  selectorIdInModal,
  selectorIsDeleteModal,
  selectorNameInModal,
  selectorTypeModal,
} from "features/modals/modal.selector"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { modalActions } from "features/modals/modal.slice"
import { BasicButton } from "components/Button/BasicButton"
import { cardsThunks } from "features/cards/cards.slice"
import { packsThunks } from "features/packs/packs.slice"

export const DeleteModal = () => {
  const { closeModals, toggleModal } = useActions(modalActions)
  const open = useAppSelector(selectorIsDeleteModal)
  const modalType = useAppSelector(selectorTypeModal)
  const name = useAppSelector(selectorNameInModal)
  const id = useAppSelector(selectorIdInModal)
  const { removePack } = useActions(packsThunks)
  const { deleteCard } = useActions(cardsThunks)
  const deleteClickHandler = () => {
    if (modalType === "Pack") {
      removePack(id)
        .unwrap()
        .then(() => {
          toggleModal({ isDelete: false })
        })
    }
    if (modalType === "Card") {
      deleteCard({ _id: id })
        .unwrap()
        .then(() => {
          toggleModal({ isDelete: false })
        })
    }
  }

  return (
    <BasicModal open={open}>
      <TitleContainer>
        <Title>Delete {modalType}</Title>
        <CloseOutlinedIcon onClick={closeModals} sx={{ cursor: "pointer" }} />
      </TitleContainer>
      <QuestionWrapper>
        <span>
          Do you really want to remove <BoldText>{name}</BoldText>
        </span>
        <span>All cards will be deleted.</span>
      </QuestionWrapper>
      <ButtonWrapper>
        <BasicButton
          onClick={closeModals}
          buttonText={<ButtonText color="black">Cancel</ButtonText>}
          width="113px"
          background="#FCFCFC"
          variant="text"
        />
        <BasicButton
          onClick={deleteClickHandler}
          buttonText={<ButtonText color="white">Delete</ButtonText>}
          width="113px"
          color="error"
        />
      </ButtonWrapper>
    </BasicModal>
  )
}

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
const TitleContainer = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  padding: 19px 24px 19px 24px;
  border-bottom: 1px solid #d9d9d9;
`
const QuestionWrapper = styled.div`
  max-width: 395px;
  margin: 29px 24px 29px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & * {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`
const BoldText = styled.strong`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
type ButtonTextProps = {
  color: string
}
const ButtonText = styled.span<ButtonTextProps>`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: ${(props) => (props.color ? props.color : "white")};
`
