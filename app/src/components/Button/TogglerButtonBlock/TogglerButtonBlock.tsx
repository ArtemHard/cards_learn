import * as React from "react"
import Button from "@mui/material/Button"
import { P } from "../../../features/packs/Packs/Packs.styled"
import { useActions, useAppSelector } from "common/hooks"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { selectorSearchParamsIsUserId, selectorUserId } from "features/packs/pack.selector"

export default function TogglerButtonBlock() {
  const [alignment, setAlignment] = React.useState<"My" | "All">("My")

  const { changeFilterParams } = useActions(packsActions)
  const { fetchPacks } = useActions(packsThunks)

  const userId = useAppSelector(selectorUserId)
  const serchParamsUserId = useAppSelector(selectorSearchParamsIsUserId)

  const handleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.currentTarget.innerText === "My" && userId) {
      setAlignment("All")
      changeFilterParams({ user_id: userId })
      fetchPacks()
    }
    if (event.currentTarget.innerText === "All" && userId) {
      setAlignment("My")
      changeFilterParams({ user_id: "" })
      fetchPacks()
    }
  }
  // проверка для кнопки каким цевтом красить
  React.useEffect(() => {
    userId === serchParamsUserId ? setAlignment("All") : setAlignment("My")
  }, [serchParamsUserId, userId])

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
