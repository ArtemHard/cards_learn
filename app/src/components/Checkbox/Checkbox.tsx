import React, { FC } from "react"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Controller, Path, Control, FieldValues } from "react-hook-form"
import Checkbox from "@mui/material/Checkbox"

type BaseCheckboxControl<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: React.ReactNode
}

export type CheckBoxProps<T extends FieldValues> = BaseCheckboxControl<T>

export function CheckboxControl<T extends FieldValues>({ control, name, label }: CheckBoxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          sx={{
            m: 1,
            margin: 0,
            marginBottom: "29px",
            width: "100%",
          }}
          control={<Checkbox sx={{ marginLeft: "-10px" }} defaultChecked={false} {...field} />}
          // WARNING How to stylised this label
          label={label}
        />
      )}
    />
  )
}
