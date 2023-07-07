import { BasicModal } from "../BasicModal"
import { useActions } from "common/hooks"
import { cardsThunks } from "features/cards/cards.slice"
import { packsThunks } from "features/packs/packs.slice"
import { MS } from "../Modal.styled"
import { useModals } from "common/hooks/useModals"
import { HeaderModal } from "../HeaderModal/HeaderModal"
import { ButtonGroupModal } from "../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { toast } from "react-toastify"

export const DeleteModal = () => {
  const { actions, selectors } = useModals()
  const { removePack } = useActions(packsThunks)
  const { deleteCard, fetchCards } = useActions(cardsThunks)
  const deleteClickHandler = () => {
    if (selectors.modalType === "Pack") {
      removePack(selectors._id)
        .unwrap()
        .then(() => {
          actions.toggleModal({ isDelete: false })
          toast.success(selectors.name + " was deleted success")
        })
    }
    if (selectors.modalType === "Card") {
      deleteCard({ id: selectors._id })
        .unwrap()
        .then(() => {
          fetchCards()
          actions.toggleModal({ isDelete: false })
          toast.success("Card was deleted sucess")
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
      <MS.ButtonGroupWrapper>
        <ButtonGroupModal
          closeModals={actions.closeModals}
          buttonTextRight="Delete"
          clickHandler={deleteClickHandler}
          color="error"
        />
      </MS.ButtonGroupWrapper>
    </BasicModal>
  )
}
