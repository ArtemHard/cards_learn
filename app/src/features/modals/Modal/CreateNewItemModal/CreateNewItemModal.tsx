import { BasicModal } from "../BasicModal"
import { useModals } from "common/hooks/useModals"
import { HeaderModal } from "../HeaderModal/HeaderModal"
import { NewItemCommonModal, NewItemCommonInputs } from "./NewItemCommonModal/NewItemCommonModal"
import { useActions } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { cardsThunks } from "features/cards/cards.slice"

export const CreateNewItemModal = () => {
  const { actions, selectors } = useModals()
  const { createPack, fetchPacks } = useActions(packsThunks)
  const { createCard, fetchCards } = useActions(cardsThunks)

  const submitHandler = (data: NewItemCommonInputs) => {
    const { answer, namePack, privatePack, question, questionFormat } = data
    if (selectors.modalType === "Pack") {
      createPack({ name: namePack, private: privatePack })
        .unwrap()
        .then(() => fetchPacks())
        .then(() => actions.toggleModal({ isCreateNew: false }))
    }
    if (selectors.modalType === "Card") {
      createCard({
        cardsPack_id: selectors._id,
        [questionFormat === "Text" ? "question" : "questionImg"]: question,
        [questionFormat === "Text" ? "answer" : "answerImg"]: answer,
      })
        .unwrap()
        .then(() => fetchCards())
        .then(() => actions.toggleModal({ isCreateNew: false }))
    }
  }
  return (
    <BasicModal open={selectors.openCreateNew}>
      <HeaderModal
        closeModals={actions.closeModals}
        modalType={selectors.modalType}
        modalTypeAction={selectors.modalTypeAction}
      />
      <NewItemCommonModal submitHandler={submitHandler} />
    </BasicModal>
  )
}
