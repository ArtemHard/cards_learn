import { RootState } from "app/store"

export const selectorIsDeleteModal = (state: RootState) => state.modal.modalShow.isDelete
export const selectorIsCreateNew = (state: RootState) => state.modal.modalShow.isCreateNew
export const selectorIsEditModal = (state: RootState) => state.modal.modalShow.isEdit
