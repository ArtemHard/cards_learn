import SelectButton, { SelectButtonProps } from "components/Selector/SelectButton"
import React from "react"
import InputLabel from "@mui/material/InputLabel"

type NewCardFormProps = {
  selectProps: Omit<SelectButtonProps, "control">
} & Pick<SelectButtonProps, "control">

export const NewCardForm = ({ control, selectProps }: NewCardFormProps) => {
  return (
    <>
      <SelectButton selects={selectProps.selects} control={control} name={selectProps.name} label={selectProps.label} />
    </>
  )
}
