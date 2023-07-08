import React, { ChangeEvent } from "react"
import IconButton from "@mui/material/IconButton"
import FolderIcon from "@mui/icons-material/Folder"
import { BoxProps } from "@mui/material"

export const InputTypeFile: React.FC<StyledBoxProps> = ({ sx }) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log("file: ", file)
    }
  }

  // Альтернативный вариант

  return (
    <IconButton sx={sx} component="label">
      <FolderIcon />
      <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
    </IconButton>
  )
}

interface StyledBoxProps extends BoxProps {
  sx?: Record<string, any>
  callback: () => void
}
