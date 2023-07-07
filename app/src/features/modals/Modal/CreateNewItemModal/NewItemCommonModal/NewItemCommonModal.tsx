import React from "react"
import { MS } from "../../Modal.styled"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { useModals } from "common/hooks/useModals"
import { NewPackForm } from "./NewPackForm"
import SelectButton from "components/Selector/SelectButton"
import { NewCardForm } from "./newCardForm"

export type NewItemCommonInputs = {
  questionFormat: "Text" | "Picture"
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
  const isPack = selectors.modalType === "Pack"
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
    console.log(data)

    submitHandler(data)
  }

  // const watchedFields = useWatch({
  //   name: ["questionFormat"],
  // })
  const questionFormat = watch().questionFormat

  return (
    <MS.FormModal onSubmit={handleSubmit(onSubmit)}>
      {isPack && <NewPackForm control={control} closeModals={actions.closeModals} />}
      {!isPack && (
        <NewCardForm
          questionFormat={questionFormat}
          control={control}
          selectProps={{ selects: ["Text", "Picture"], name: "questionFormat", label: "Choose format" }}
          closeModals={actions.closeModals}
        />
      )}
    </MS.FormModal>
  )
}
