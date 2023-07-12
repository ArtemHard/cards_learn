import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit"
import { MS } from "../Modal.styled"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { ModalTypeAction } from "features/modals/modal.selector"

type HeaderModal = {
  modalType: "Pack" | "Card"
  closeModals: ActionCreatorWithoutPayload<"modals/closeModals">
  modalTypeAction: ModalTypeAction
}

export const HeaderModal = ({ modalType, closeModals, modalTypeAction }: HeaderModal) => {
  return (
    <MS.TitleContainer>
      <MS.Title>{generateTitleText(modalTypeAction, modalType)}</MS.Title>
      <CloseOutlinedIcon onClick={() => closeModals()} sx={{ cursor: "pointer" }} />
    </MS.TitleContainer>
  )
}

const generateTitleText = (typeAction: ModalTypeAction, modalType: "Pack" | "Card"): string => {
  switch (typeAction) {
    case "isCreateNew":
      return "Add new " + modalType.toLowerCase()
    case "isDelete":
      return "Delete " + modalType
    case "isEdit":
      return "Edit " + modalType.toLowerCase()
    default:
      return ""
  }
}
