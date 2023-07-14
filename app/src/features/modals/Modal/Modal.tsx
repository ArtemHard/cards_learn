import React from "react"
import { DeleteModal } from "./DeleteModal/DeleteModal"
import { CreateNewItemModal } from "./CreateNewItemModal/CreateNewItemModal"
import { NewItemEditModal } from "./NewItemEditModal"

export const Modal = () => {
  return (
    <>
      <DeleteModal />
      <CreateNewItemModal />
      {/* <NewItemEditModal /> */}
    </>
  )
}
