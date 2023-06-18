import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { P } from "../../../features/packs/Packs/Packs.styled"
import { useDebounce } from "common/utils/useDebounce"
import { useActions, useAppSelector } from "common/hooks"
import { selectorSerchPackName } from "features/packs/pack.selector"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { useEffect } from "react"

export const SearchInputBlock = () => {
  const searchQuery = useAppSelector(selectorSerchPackName)
  const { changeFilterParams } = useActions(packsActions)
  const { fetchPacks } = useActions(packsThunks)
  const debouncedSearchTerm = useDebounce(searchQuery, 2000)
  const onChangeHanler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeFilterParams({ packName: event.currentTarget.value })
  }

  useEffect(() => {
    if (debouncedSearchTerm || "") {
      fetchPacks()
    }
    return () => {}
  }, [debouncedSearchTerm, searchQuery])

  useEffect(() => {
    return () => {
      changeFilterParams({ packName: null })
    }
  }, [])
  return (
    <P.ParamContainer key={"search"}>
      <P.ParamsName>Search</P.ParamsName>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        placeholder="Provide your text"
        InputProps={{
          autoComplete: "off",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />{" "}
            </InputAdornment>
          ),
        }}
        fullWidth={true}
        sx={{ height: "36px", width: "413px" }}
        onChange={onChangeHanler}
        autoComplete="off"
      />
    </P.ParamContainer>
  )
}
