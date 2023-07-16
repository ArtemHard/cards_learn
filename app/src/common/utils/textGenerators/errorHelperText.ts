import { FieldError } from "react-hook-form"

export const errorHelperText = (errors?: FieldError | undefined, rules?: Record<string, any>): string | undefined => {
  switch (errors?.type) {
    case "required":
      return "This field is required"
    case "minLength":
      return "Minimum length is " + rules?.minLength
    case "validate":
      return "Passwords do not match"
    default:
      return undefined
  }
}
