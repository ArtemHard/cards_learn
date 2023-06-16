import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { P } from "../../../features/packs/Packs/Packs.styled"

export const SearchInputBlock = () => {
  return (
    <P.ParamContainer key={"search"}>
      <P.ParamsName>Search</P.ParamsName>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        placeholder="Provide your text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        autoComplete="off"
        fullWidth={true}
        sx={{ height: "36px", width: "413px" }}
      />
    </P.ParamContainer>
  )
}
