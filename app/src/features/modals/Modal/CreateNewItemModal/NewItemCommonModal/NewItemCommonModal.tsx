import React, { useEffect } from "react"
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
    setValue,

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

  // const watchedFields = useWatch({
  //   name: ["questionFormat"],
  // })
  const questionFormat = watch().questionFormat
  const question = watch().question
  const answer = watch().answer

  useEffect(() => {
    const regex = /^data:/
    if (questionFormat === "Text") {
      const isDataUrlQuestion = regex.test(question)
      const isDataUrlAnswer = regex.test(answer)
      if (isDataUrlQuestion) setValue("question", "")
      if (isDataUrlAnswer) setValue("answer", "")
    }
    if (questionFormat === "Picture") {
      const isDataUrlQuestion = regex.test(question)
      const isDataUrlAnswer = regex.test(answer)
      if (!isDataUrlQuestion) setValue("question", "")
      if (!isDataUrlAnswer) setValue("answer", "")
    }
  }, [questionFormat])
  return (
    <MS.FormModal onSubmit={handleSubmit(onSubmit)}>
      {isPack && <NewPackForm control={control} closeModals={actions.closeModals} />}
      {!isPack && (
        <NewCardForm
          setValue={setValue}
          questionFormat={questionFormat}
          question={question}
          answer={answer}
          control={control}
          selectProps={{ selects: ["Text", "Picture"], name: "questionFormat", label: "Choose format" }}
          closeModals={actions.closeModals}
        />
      )}
    </MS.FormModal>
  )
}
