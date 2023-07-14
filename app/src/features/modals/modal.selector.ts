import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app/store"

export const selectorIsDeleteModal = (state: RootState) => state.modal.modalShow.isDelete
export const selectorIsCreateNew = (state: RootState) => state.modal.modalShow.isCreateNew
export const selectorIsEditModal = (state: RootState) => state.modal.modalShow.isEdit
export const selectorTypeModal = (state: RootState) => state.modal.type
export const selectorNameInModal = (state: RootState) => state.modal.name
export const selectorIdInModal = (state: RootState) => state.modal._id
export const selectorQuestionModal = (state: RootState) => state.modal.question
export const selectorAnswerModal = (state: RootState) => state.modal.answer
export const selectorDeckCoverModal = (state: RootState) => state.modal.deckCover
// export const selectorIsOpenModal = (state: RootState) => {
//   return Object.values(state.modal.modalShow).some((value) => {
//     console.log(value)

//     return value === true
//   })
// }
const selectorOpenModal = (state: RootState) => state.modal.modalShow
export const selectorIsOpenModal = createSelector(selectorOpenModal, (obj) => {
  return Object.values(obj).some((value) => {
    console.log(value)

    return value === true
  })
})

export const selectorModalTypeAction = (state: RootState): ModalTypeAction => {
  const modalshow = state.modal.modalShow

  for (const key in modalshow) {
    if (modalshow[key as keyof typeof modalshow] === true) {
      return key as "isDelete" | "isCreateNew" | "isEdit"
    }
  }

  return null
}

export type ModalTypeAction = "isDelete" | "isCreateNew" | "isEdit" | null
