import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { P } from "../../../features/packs/Packs/Packs.styled"
import { useDebounce } from "common/utils/useDebounce"
import { useActions, useAppSelector } from "common/hooks"
import { selectorSerchPackName } from "features/packs/pack.selector"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { useEffect } from "react"

type SearchInputBlockProps = {
  searchQuery: string | null
  changeFilterParams: (params: string | null) => void
  fetch: () => void
  width?: string
}

export const SearchInputBlock = ({ changeFilterParams, fetch, searchQuery, width }: SearchInputBlockProps) => {
  // const searchQuery = useAppSelector(selectorSerchPackName)
  // const { changeFilterParams } = useActions(packsActions)
  // const { fetchPacks } = useActions(packsThunks)
  const debouncedSearchTerm = useDebounce(searchQuery, 2000)
  const onChangeHanler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchParams = event.currentTarget.value
    // changeFilterParams({ packName: searchParams === "" ? "" : searchParams })
    changeFilterParams(searchParams)
  }

  useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTerm === "") {
      // fetchPacks()
      fetch()
    }
    // return () => {}
  }, [debouncedSearchTerm])

  useEffect(() => {
    return () => {
      // changeFilterParams({ packName: null })
      changeFilterParams(null)
    }
  }, [])
  return (
    // <P.ParamContainer key={"search"} width={width}>
    <>
      <P.ParamsName>Search</P.ParamsName>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        placeholder="Provide your text"
        InputProps={{
          autoComplete: "off",
          startAdornment: (
            // <InputAdornment position="start">
            <SearchIcon />
            // </InputAdornment>
          ),
        }}
        fullWidth={true}
        value={searchQuery}
        sx={{ height: "36px", width: width ? width : "413px" }}
        onChange={onChangeHanler}
        autoComplete="off"
      />
    </>
    // </P.ParamContainer>
  )
}
