import React, { useEffect } from "react"
import { MS } from "../../Modal.styled"
import { SubmitHandler, useForm } from "react-hook-form"
import { useModals } from "common/hooks/useModals"
import { NewPackForm } from "./NewPackForm"
import { NewCardForm } from "./newCardForm"

export type NewItemCommonInputs = {
  questionFormat: "Text" | "Picture"
  question: string
  answer: string
  namePack: string
  privatePack: boolean
  deckCover: string
}
type NewItemFormModalProps = {
  submitHandler: (data: NewItemCommonInputs) => void
}
export const NewItemCommonModal = ({ submitHandler }: NewItemFormModalProps) => {
  const { selectors, actions } = useModals()
  const isPack = selectors.modalType === "Pack"
  const {
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
      deckCover: "",
    },
  })

  const onSubmit: SubmitHandler<NewItemCommonInputs> = (data) => {
    submitHandler(data)
  }

  const questionFormat = watch().questionFormat
  const question = watch().question
  const answer = watch().answer
  const deckCover = watch().deckCover
  // для обработки newCardModal зачищать на инпутах данные о картинке
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
      {isPack && (
        <NewPackForm control={control} closeModals={actions.closeModals} deckCover={deckCover} setValue={setValue} />
      )}
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
