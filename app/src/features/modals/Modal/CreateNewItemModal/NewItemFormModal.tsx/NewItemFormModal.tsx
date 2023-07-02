import React from "react"
import { MS } from "../../Modal.styled"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { useModals } from "common/hooks/useModals"
import { useAppSelector } from "common/hooks"

type NewItemFormModal = {
  questionFormat: "Text"
  question: string
  answer: string
  namePack: string
  privatePack: boolean
}

export const NewItemFormModal = () => {
  const { selectors } = useModals()
  const {
    register,
    handleSubmit,
    watch,
    control,
    // formState: { errors },
  } = useForm<NewItemFormModal>({
    defaultValues: {
      questionFormat: "Text",
      question: selectors.question,
      answer: selectors.answer,
      namePack: selectors.nameInModal,
      privatePack: false,
    },
  })

  const onSubmit: SubmitHandler<NewItemFormModal> = (data) => {
    console.log(data)
  }

  return (
    <MS.FormModal onSubmit={handleSubmit(onSubmit)}>
      <TextInput control={control} label="Name pack" name="namePack" type="text" />
      {/* <TextInput/> */}
      <input type="submit" />
    </MS.FormModal>
  )
}
