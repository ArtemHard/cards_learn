import React, { ReactNode } from "react"
import Button from "@mui/material/Button"

type BasicButtonPropsType = {
  background?: string
  buttonText: ReactNode
  isLoading?: boolean
  color?: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning"
  variant?: "text" | "contained" | "outlined"
  width?: string
  marginBottom?: string
  type?: "button" | "submit" | "reset" | undefined
} & React.HTMLAttributes<HTMLButtonElement>

export const BasicButton = ({
  buttonText,
  type,
  width,
  marginBottom,
  onClick,
  isLoading,
  background,
  variant,
  color,
}: BasicButtonPropsType) => {
  return (
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
      onClick={onClick}
      type={type ?? "submit"}
      variant={variant ?? "contained"}
      disabled={isLoading}
      color={color ?? "primary"}
    >
      {buttonText}
    </Button>
  )
}
