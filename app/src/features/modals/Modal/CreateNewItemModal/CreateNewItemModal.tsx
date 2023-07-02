import { BasicModal } from "../BasicModal"
import { useModals } from "common/hooks/useModals"
import { HeaderModal } from "../HeaderModal/HeaderModal"
import { NewItemFormModal } from "./NewItemFormModal.tsx/NewItemFormModal"

// type CreateNewItemModalProps = {
//    newItemFormChild: ReactNode
// }

export const CreateNewItemModal = () => {
  const { actions, selectors } = useModals()
  console.log(selectors.open)

  return (
    <BasicModal open={selectors.open}>
      <HeaderModal
        closeModals={actions.closeModals}
        modalType={selectors.modalType}
        modalTypeAction={selectors.modalTypeAction}
      />
      <NewItemFormModal />
    </BasicModal>
  )
}
