import { isAxiosError } from "axios"
import { toast } from "react-toastify"

export const errorToastHandler = (err: any) => {
  if (isAxiosError(err.e)) {
    const axiosErr = err.e?.response?.data?.error
    if (typeof axiosErr === "string") {
      toast.error(axiosErr)
    } else {
      toast.error(err.e.message)
    }
  }
}
