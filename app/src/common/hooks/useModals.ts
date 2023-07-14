import React from "react"
import { useActions } from "./useActions"
import { modalActions } from "features/modals/modal.slice"
import { useAppSelector } from "./useAppSelector"
import {
  selectorAnswerModal,
  selectorDeckCoverModal,
  selectorIdInModal,
  selectorIsCreateNew,
  selectorIsDeleteModal,
  selectorIsEditModal,
  selectorModalTypeAction,
  selectorNameInModal,
  selectorQuestionModal,
  selectorTypeModal,
} from "features/modals/modal.selector"

export const useModals = () => {
  const { closeModals, toggleModal } = useActions(modalActions)
  const modalTypeAction = useAppSelector(selectorModalTypeAction)
  const openDelete = useAppSelector(selectorIsDeleteModal)
  const openEdit = useAppSelector(selectorIsEditModal)
  const openCreateNew = useAppSelector(selectorIsCreateNew)
  const modalType = useAppSelector(selectorTypeModal)
  const name = useAppSelector(selectorNameInModal)
  const _id = useAppSelector(selectorIdInModal)
  const answer = useAppSelector(selectorAnswerModal)
  const question = useAppSelector(selectorQuestionModal)
  const nameInModal = useAppSelector(selectorNameInModal)
  const deckCover = useAppSelector(selectorDeckCoverModal)

  return {
    actions: {
      closeModals,
      toggleModal,
    },
    selectors: {
      open: openDelete,
      modalType,
      name,
      _id,
      modalTypeAction,
      answer,
      question,
      nameInModal,
      openEdit,
      openCreateNew,
      deckCover,
    },
  }
}
