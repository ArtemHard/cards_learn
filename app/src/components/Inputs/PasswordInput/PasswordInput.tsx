import { useState } from "react"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { InputProps as MuiInputProps, TextFieldProps as MuiTextFieldProps } from "@mui/material"
import { BaseInputProps } from "../TextInput/TextInput"

export type PasswordInputProps<T extends FieldValues> = Omit<
  BaseInputProps<T> & {
    marginBottom: "24px" | "60px"
  },
  "type"
>

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  rules = {},
  inputProps,
  marginBottom,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl sx={{ width: "100%", marginBottom: marginBottom }} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input
            id={name as string}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...field}
            {...inputProps}
            required={!!rules.required} // pass the required attribute to the Input component if it exists in rules
          />
        )}
      />
    </FormControl>
  )
}
