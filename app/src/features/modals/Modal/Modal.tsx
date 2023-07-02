import React from "react"
import { DeleteModal } from "./DeleteModal/DeleteModal"
import { CreateNewItemModal } from "./CreateNewItemModal/CreateNewItemModal"

export const Modal = () => {
  return (
    <>
      <DeleteModal />
      <CreateNewItemModal />
    </>
  )
}
