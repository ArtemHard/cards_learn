import * as React from "react"
import Button from "@mui/material/Button"
import { P } from "../../../features/packs/Packs/Packs.styled"

export default function TogglerButtonBlock() {
  const [alignment, setAlignment] = React.useState<"My" | "All">("My")

  const handleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event.currentTarget.innerText)
    if (event.currentTarget.innerText === "My") {
      setAlignment("All")
    }
    if (event.currentTarget.innerText === "All") setAlignment("My")
  }

  return (
    <P.ParamContainer>
      <P.ParamsName>Show packs cards</P.ParamsName>
      <div>
        <Button
          name="My"
          variant={alignment === "My" ? "outlined" : "contained"}
          size="small"
          sx={{ borderRadius: "2px", width: "98px", height: "36px", textTransform: "none" }}
          onClick={handleChange}
        >
          My
        </Button>
        <Button
          name="All"
          variant={alignment === "All" ? "outlined" : "contained"}
          size="small"
          sx={{ borderRadius: "2px", width: "98px", height: "36px", textTransform: "none" }}
          onClick={handleChange}
        >
          All
        </Button>
      </div>
    </P.ParamContainer>
  )
}
