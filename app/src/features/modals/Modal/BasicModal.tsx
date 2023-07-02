import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useActions } from "common/hooks"
import { modalActions } from "../modal.slice"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  //   p: 4,
}

export type BasicModalProps = {
  children: any
  open: boolean
}

export const BasicModal: React.FC<BasicModalProps> = ({ children, open }) => {
  const { closeModals } = useActions(modalActions)
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModals}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
