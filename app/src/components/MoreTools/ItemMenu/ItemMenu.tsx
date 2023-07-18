import React from "react"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"

type ItemMenuProps = {
  callback: () => void
  childrenIcon?: React.ReactNode
  innerText: string
  disabled?: boolean
}

export const ItemMenu = ({ callback, childrenIcon, innerText, disabled }: ItemMenuProps) => {
  return (
    <MenuItem key={"setting.text"} onClick={callback} disabled={disabled}>
      <Typography
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}
        textAlign="center"
        //   onClick={() => alert("action")}
      >
        {childrenIcon}
        {innerText}
      </Typography>
    </MenuItem>
  )
}
