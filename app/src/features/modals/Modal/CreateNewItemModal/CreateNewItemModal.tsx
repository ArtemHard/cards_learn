import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import { useModals } from "common/hooks/useModals"
import { HeaderModal } from "../HeaderModal/HeaderModal"
import { NewItemCommonModal, NewItemCommonInputs } from "./NewItemCommonModal/NewItemCommonModal"
import { useActions } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { cardsThunks } from "features/cards/cards.slice"

export const CreateNewItemModal = () => {
  const { actions, selectors } = useModals()
  const { createPack, updatePack, fetchPacks } = useActions(packsThunks)
  const { createCard, updateCard, fetchCards } = useActions(cardsThunks)

  const submitHandler = (data: NewItemCommonInputs) => {
    const { answer, namePack, privatePack, question, questionFormat, deckCover } = data
    if (selectors.modalType === "Pack" && selectors.openCreateNew) {
      createPack({ name: namePack, private: privatePack, deckCover })
        .unwrap()
        .then(() => fetchPacks())
        .then(() => actions.toggleModal({ isCreateNew: false }))
      return
    }
    if (selectors.modalType === "Card" && selectors.openCreateNew) {
      createCard({
        cardsPack_id: selectors._id,
        [questionFormat === "Text" ? "question" : "questionImg"]: question,
        [questionFormat === "Text" ? "answer" : "answerImg"]: answer,
      })
        .unwrap()
        .then(() => fetchCards())
        .then(() => actions.toggleModal({ isCreateNew: false }))

      return
    }
    if (selectors.modalType === "Pack" && selectors.openEdit) {
      updatePack({
        _id: selectors._id,
        name: namePack,
        deckCover,
        private: privatePack,
      })
        .unwrap()
        // убрал, если сервер не загруженный верну

        // .then(() => fetchPacks())
        .then(() => actions.toggleModal({ isEdit: false }))
      return
    }
    if (selectors.modalType === "Card" && selectors.openEdit) {
      updateCard({
        _id: selectors._id,
        [questionFormat === "Text" ? "question" : "questionImg"]: question,
        [questionFormat === "Text" ? "answer" : "answerImg"]: answer,
      })
        .unwrap()
        // убрал, если сервер не загруженный верну
        // .then(() => fetchCards())
        .then(() => actions.toggleModal({ isCreateNew: false }))
      return
    }
  }
  return (
    <BasicModal open={selectors.openCreateNew || selectors.openEdit}>
      <HeaderModal
        closeModals={actions.closeModals}
        modalType={selectors.modalType}
        modalTypeAction={selectors.modalTypeAction}
      />
      <NewItemCommonModal submitHandler={submitHandler} />
    </BasicModal>
  )
}
