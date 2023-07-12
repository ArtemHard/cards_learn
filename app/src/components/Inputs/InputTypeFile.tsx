import React, { ChangeEvent, useRef } from "react"
import IconButton from "@mui/material/IconButton"
import FolderIcon from "@mui/icons-material/Folder"
import { BoxProps } from "@mui/material"
import { fileToBase64 } from "common/utils/fileToBase64"
import { toast } from "react-toastify"
import Button from "@mui/material/Button"
import { BasicButtonPropsType } from "components/Button/BasicButton"
import styled from "styled-components"

export const InputTypeFile: React.FC<InputTypeFileProps> = ({ sx, callback, type, width, marginBottom, children }) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        fileToBase64(file, callback)
      } else {
        console.error("Error: ", "Файл слишком большого размера")
        toast.error("Максимальный размер файла 100 киллобайт")
      }
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  if (type === "icon") {
    return (
      <IconButton sx={sx} component="label">
        <FolderIcon />
        <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
      </IconButton>
    )
  } else if (type === "button") {
    return (
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
        <Button
          sx={{
            m: 1,
            width: width ? width : "100%",
            height: "36px",
            borderRadius: "50px",
            textTransform: "none",
            margin: "0px",
            marginBottom: marginBottom ?? "31px",
            // background: background ? background : "#366EFF",
            boxShadow: "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
          }}
          variant="contained"
          component="span"
        >
          Choose file
        </Button>
      </label>
    )
  } else
    return (
      <div>
        <ChangeCoverBtn type={"button"} onClick={selectFileHandler}>
          {children}
        </ChangeCoverBtn>
        <input style={{ display: "none" }} ref={inputRef} type="file" onChange={uploadHandler} />
      </div>
    )
}

interface StyledBoxProps extends BoxProps {
  sx?: Record<string, any>
  callback: (file: string) => void
  type: "button" | "icon" | "link"
}

type InputTypeFileProps = StyledBoxProps & Omit<BasicButtonPropsType, "type" | "buttonText">

const ChangeCoverBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #366eff;
  text-decoration: underline;
  cursor: pointer;
`
