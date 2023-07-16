import React from "react"
import { DeleteModal } from "./DeleteModal/DeleteModal"
import { CreateUpdateItemModal } from "./CreateUpdateItemModal/CreateUpdateItemModal"

export const Modal = () => {
  return (
    <>
      <DeleteModal />
      <CreateUpdateItemModal />
    </>
  )
}
