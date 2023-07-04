import React from "react"
import { MS } from "../../Modal.styled"
import { SubmitHandler, useForm } from "react-hook-form"
import { useModals } from "common/hooks/useModals"
import { NewPackForm } from "./NewPackForm"

export type NewItemCommonInputs = {
  questionFormat: "Text"
  question: string
  answer: string
  namePack: string
  privatePack: boolean
}
type NewItemFormModalProps = {
  submitHandler: (data: NewItemCommonInputs) => void
}
export const NewItemCommonModal = ({ submitHandler }: NewItemFormModalProps) => {
  const { selectors, actions } = useModals()
  const {
    register,
    handleSubmit,
    watch,
    control,
    // formState: { errors },
  } = useForm<NewItemCommonInputs>({
    defaultValues: {
      questionFormat: "Text",
      question: selectors.question,
      answer: selectors.answer,
      namePack: selectors.nameInModal,
      privatePack: false,
    },
  })

  const onSubmit: SubmitHandler<NewItemCommonInputs> = (data) => {
    submitHandler(data)
  }

  return (
    <MS.FormModal onSubmit={handleSubmit(onSubmit)}>
      <NewPackForm control={control} closeModals={actions.closeModals} />
    </MS.FormModal>
  )
}
