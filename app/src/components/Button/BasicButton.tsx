import React from "react"
import Button from "@mui/material/Button"

type BasicButtonPropsType = {
  buttonText: string
  type?: "button" | "submit" | "reset" | undefined
} & React.HTMLAttributes<HTMLButtonElement>

export const BasicButton = ({ buttonText, type, onClick }: BasicButtonPropsType) => {
  return (
    <Button
      sx={{
        m: 1,
        width: "100%",
        height: "48px",
        borderRadius: "50px",
        textTransform: "none",
        marginBottom: "31px",
        background: "#366EFF",
        boxShadow: "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
      }}
      onClick={onClick}
      type={type ? type : "submit"}
      variant="contained"
    >
      {buttonText}
    </Button>
  )
}
