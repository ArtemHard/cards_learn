import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { InputProps as MuiInputProps, TextFieldProps as MuiTextFieldProps } from "@mui/material"

export type BaseInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  type: HTMLInputElement["type"] // use HTMLInputElement type for the type field
  label: string
  rules?: Record<string, any>
  inputProps?: MuiInputProps
  textFieldProps?: MuiTextFieldProps
  margin?: string
}

export type TextInputProps<T extends FieldValues> = BaseInputProps<T>

export function TextInput<T extends FieldValues>({
  name,
  control,
  type,
  label,
  rules = {},
  inputProps,
  margin,
}: TextInputProps<T>) {
  return (
    <FormControl sx={{ m: 1, width: "100%", marginBottom: "24px", margin: margin }} variant="standard">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            type={type ?? "text"}
            defaultValue={inputProps?.defaultValue}
            id="standard-basic"
            label={label}
            variant="standard"
            {...field}
            // onBlur={inputProps?.onBlur || field.onBlur}
            //@ts-ignore
            onKeyDown={inputProps?.onKeyDown}
          />
        )}
      />
    </FormControl>
  )
}
