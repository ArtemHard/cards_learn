import { BasicButton } from "components/Button/BasicButton"
import { MS } from "../../Modal.styled"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit"

type ButtonGroupModal = {
  closeModals: ActionCreatorWithoutPayload<"modals/closeModals">
  buttonTextRight: string
  clickHandler?: () => void
  color?: "error"
  type?: "button" | "submit" | "reset"
}

export const ButtonGroupModal = ({ closeModals, buttonTextRight, clickHandler, color, type }: ButtonGroupModal) => {
  return (
    <MS.ButtonWrapper>
      <BasicButton
        onClick={() => closeModals()}
        buttonText={<MS.ButtonText color="black">Cancel</MS.ButtonText>}
        width="113px"
        background="#FCFCFC"
        variant="text"
        marginBottom="0"
      />
      <BasicButton
        onClick={clickHandler}
        buttonText={<MS.ButtonText color="white">{buttonTextRight}</MS.ButtonText>}
        width="113px"
        marginBottom="0"
        color={color}
        type={type ?? undefined}
      />
    </MS.ButtonWrapper>
  )
}
