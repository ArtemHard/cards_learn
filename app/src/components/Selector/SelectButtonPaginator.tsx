import { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import InputBase from "@mui/material/InputBase"

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 12,
    padding: "2px 26px 2px 5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))

type SelectButtonCommonProps = {
  cardsCount: number[]
  changePageCount: (number: number) => void
  pageCount: number
}

export default function SelectButtonPaginator({ cardsCount, changePageCount, pageCount }: SelectButtonCommonProps) {
  const initialParam = cardsCount[0].toString()
  const [age, setAge] = useState<string>(initialParam)
  const handleChange = (event: { target: { value: string } }) => {
    changePageCount(+event.target.value)
  }

  useEffect(() => {
    setAge(pageCount.toString())
  }, [pageCount])
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard" size="small">
        <Select id="demo-customized-select" value={age} onChange={handleChange} input={<BootstrapInput />}>
          <MenuItem value={initialParam}>{initialParam}</MenuItem>
          {cardsCount.map((el) => {
            return el !== +initialParam ? (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ) : null
          })}
        </Select>
      </FormControl>
    </div>
  )
}
