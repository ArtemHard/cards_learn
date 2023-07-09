import React, { ChangeEvent } from "react"
import IconButton from "@mui/material/IconButton"
import FolderIcon from "@mui/icons-material/Folder"
import { BoxProps } from "@mui/material"
import { fileToBase64 } from "common/utils/fileToBase64"
import { toast } from "react-toastify"

export const InputTypeFile: React.FC<StyledBoxProps> = ({ sx, callback }) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log("file: ", file)

      if (file.size < 4000000) {
        fileToBase64(file, callback)
      } else {
        console.error("Error: ", "Файл слишком большого размера")
        toast.error("Максимальный размер файла 100 киллобайт")
      }
    }
  }

  return (
    <IconButton sx={sx} component="label">
      <FolderIcon />
      <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
    </IconButton>
  )
}

interface StyledBoxProps extends BoxProps {
  sx?: Record<string, any>
  callback: (file: string) => void
}
