import React from "react"
import Button from "@mui/material/Button"

type BasicButtonPropsType = {
  buttonText: string
}

export const BasicButton = ({
  buttonText,
}: BasicButtonPropsType) => {
  return (
    <Button
      sx={{ m: 1, width: "100%", borderRadius: "50px" }}
      type="submit"
      variant="contained"
    >
      {buttonText}
    </Button>
  )
}
