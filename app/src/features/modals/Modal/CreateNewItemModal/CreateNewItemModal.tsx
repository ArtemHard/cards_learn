import { FC, ReactNode } from "react"
import { BasicModal } from "../BasicModal"
import { useModals } from "common/hooks/useModals"
import { HeaderModal } from "../HeaderModal/HeaderModal"

type CreateNewItemModalProps = {
  newItemFormChild: ReactNode
}

export const CreateNewItemModal: FC<CreateNewItemModalProps> = ({ newItemFormChild }) => {
  const { actions, selectors } = useModals()
  return (
    <BasicModal open={selectors.open}>
      <HeaderModal
        closeModals={actions.closeModals}
        modalType={selectors.modalType}
        modalTypeAction={selectors.modalTypeAction}
      />
      {newItemFormChild}
    </BasicModal>
  )
}
