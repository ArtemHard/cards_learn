import { BasicModal } from "../BasicModal"
import { useActions } from "common/hooks"
import { BasicButton } from "components/Button/BasicButton"
import { cardsThunks } from "features/cards/cards.slice"
import { packsThunks } from "features/packs/packs.slice"
import { MS } from "../Modal.styled"
import { useModals } from "common/hooks/useModals"
import { HeaderModal } from "../HeaderModal/HeaderModal"

export const DeleteModal = () => {
  const { actions, selectors } = useModals()
  const { removePack } = useActions(packsThunks)
  const { deleteCard } = useActions(cardsThunks)
  const deleteClickHandler = () => {
    if (selectors.modalType === "Pack") {
      removePack(selectors._id)
        .unwrap()
        .then(() => {
          actions.toggleModal({ isDelete: false })
        })
    }
    if (selectors.modalType === "Card") {
      deleteCard({ _id: selectors._id })
        .unwrap()
        .then(() => {
          actions.toggleModal({ isDelete: false })
        })
    }
  }

  return (
    <BasicModal open={selectors.open}>
      <HeaderModal
        closeModals={actions.closeModals}
        modalType={selectors.modalType}
        modalTypeAction={selectors.modalTypeAction}
      />
      <MS.QuestionWrapper>
        <span>
          Do you really want to remove <MS.BoldText>{selectors.name}</MS.BoldText>
        </span>
        {selectors.modalType === "Pack" && <span>All cards will be deleted.</span>}
      </MS.QuestionWrapper>
      <MS.ButtonWrapper>
        <BasicButton
          onClick={actions.closeModals}
          buttonText={<MS.ButtonText color="black">Cancel</MS.ButtonText>}
          width="113px"
          background="#FCFCFC"
          variant="text"
        />
        <BasicButton
          onClick={deleteClickHandler}
          buttonText={<MS.ButtonText color="white">Delete</MS.ButtonText>}
          width="113px"
          color="error"
        />
      </MS.ButtonWrapper>
    </BasicModal>
  )
}
