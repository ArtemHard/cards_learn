import React from "react"
import { useActions } from "./useActions"
import { modalActions } from "features/modals/modal.slice"
import { useAppSelector } from "./useAppSelector"
import {
  selectorIdInModal,
  selectorIsDeleteModal,
  selectorModalTypeAction,
  selectorNameInModal,
  selectorTypeModal,
} from "features/modals/modal.selector"

export const useModals = () => {
  const { closeModals, toggleModal } = useActions(modalActions)
  const modalTypeAction = useAppSelector(selectorModalTypeAction)
  const open = useAppSelector(selectorIsDeleteModal)
  const modalType = useAppSelector(selectorTypeModal)
  const name = useAppSelector(selectorNameInModal)
  const _id = useAppSelector(selectorIdInModal)

  return {
    actions: {
      closeModals,
      toggleModal,
    },
    selectors: {
      open,
      modalType,
      name,
      _id,
      modalTypeAction,
    },
  }
}
