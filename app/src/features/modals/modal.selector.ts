import { RootState } from "app/store"

export const selectorIsDeleteModal = (state: RootState) => state.modal.modalShow.isDelete
export const selectorIsCreateNew = (state: RootState) => state.modal.modalShow.isCreateNew
export const selectorIsEditModal = (state: RootState) => state.modal.modalShow.isEdit
export const selectorTypeModal = (state: RootState) => state.modal.type
export const selectorNameInModal = (state: RootState) => state.modal.name
export const selectorIdInModal = (state: RootState) => state.modal.id
export const selectorQuestionModal = (state: RootState) => state.modal.question
export const selectorAnswerModal = (state: RootState) => state.modal.answer
export const selectorIsOpenModal = (state: RootState) => {
  return Object.values(state.modal.modalShow).some((value) => value === true)
}
