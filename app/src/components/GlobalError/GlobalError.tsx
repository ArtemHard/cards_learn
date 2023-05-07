import { useAppSelector } from "common/hooks"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const GlobalError = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useDispatch()
  if (error !== null) {
    toast.error(error)
  }

  useEffect(() => {
    setTimeout(() => {
      toast.error(null)
    }, 2000)
  }, [])

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}
