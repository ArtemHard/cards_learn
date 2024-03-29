import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { Control, Controller } from "react-hook-form"
import { NewItemCommonInputs } from "features/modals/Modal/CreateUpdateItemModal/CreateUpdateFormModal/CreateUpdateFormModal"
import InputLabel from "@mui/material/InputLabel"
import styled from "styled-components"
export type SelectButtonProps = {
  name: keyof NewItemCommonInputs
  selects: number[] | string[]
  control: Control<NewItemCommonInputs>
  label: string
}

export default function SelectButton({ name, selects, control, label }: SelectButtonProps) {
  const initialParam = selects[0].toString()
  return (
    <Wrapper>
      <InputLabel sx={{ marginBottom: "8px" }}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <FormControl fullWidth>
              <Select sx={{ height: "36px" }} labelId="demo-simple-select-label" id="demo-simple-select" {...field}>
                <MenuItem value={initialParam} sx={{ height: "36px" }}>
                  {initialParam}
                </MenuItem>
                {selects.map((el) => {
                  return el.toString() !== initialParam ? (
                    <MenuItem sx={{ height: "36px" }} value={el}>
                      {el}
                    </MenuItem>
                  ) : null
                })}
              </Select>
            </FormControl>
          )
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`
