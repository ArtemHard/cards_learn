import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form"
import { InputProps as MuiInputProps, TextFieldProps as MuiTextFieldProps } from "@mui/material"
import { errorHelperText } from "common/utils"

export type BaseInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  type: HTMLInputElement["type"] // use HTMLInputElement type for the type field
  label: string
  rules?: Record<string, any>
  inputProps?: MuiInputProps
  textFieldProps?: MuiTextFieldProps
  margin?: string
  errors?: FieldError | undefined
}

export type TextInputProps<T extends FieldValues> = BaseInputProps<T>

export function TextInput<T extends FieldValues>({
  name,
  control,
  type,
  label,
  rules,
  inputProps,
  margin,
  errors,
}: TextInputProps<T>) {
  return (
    <FormControl
      sx={{
        m: 1,
        width: "100%",
        marginBottom: "24px",
        // margin: margin,
      }}
      variant="standard"
    >
      <Controller
        key={name}
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            key={name + label}
            type={type ?? "text"}
            defaultValue={inputProps?.defaultValue}
            // id="standard-basic"
            id="standard-error-helper-text"
            label={label}
            variant="standard"
            sx={{
              height: "64px",
              "& .MuiInputBase-input": {
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
            {...field}
            // onBlur={inputProps?.onBlur || field.onBlur}
            //@ts-ignore
            onKeyDown={inputProps?.onKeyDown}
            error={!!errors}
            helperText={errorHelperText(errors, rules)}
            // InputLabelProps={{ shrink: true }}
            // sx={{ height: "64px" }}
          />
        )}
      />
    </FormControl>
  )
}
