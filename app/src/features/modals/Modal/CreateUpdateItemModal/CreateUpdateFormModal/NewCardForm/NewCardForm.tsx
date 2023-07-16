import SelectButton, { SelectButtonProps } from "components/Selector/SelectButton"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { ButtonGroupModal } from "../../../ButtonGroupModal/ButtonGroupModal"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { FieldErrors, UseFormSetValue } from "react-hook-form"
import { NewItemCommonInputs } from "../CreateUpdateFormModal"
import { AddImg } from "components/AddImg/AddImg"
import { useAppSelector } from "common/hooks"
import { selectorIsEditModal } from "features/modals/modal.selector"

type NewCardFormProps = {
  selectProps: Omit<SelectButtonProps, "control">
  closeModals: ActionCreatorWithPayload<any, "modals/closeModals">
  questionFormat: "Text" | "Picture"
  setValue: UseFormSetValue<NewItemCommonInputs>
  question: string
  answer: string
  errors: FieldErrors<NewItemCommonInputs>
} & Pick<SelectButtonProps, "control">

export const NewCardForm = ({
  control,
  selectProps,
  closeModals,
  questionFormat,
  question,
  answer,
  setValue,
  errors,
}: NewCardFormProps) => {
  const isEdit = useAppSelector(selectorIsEditModal)

  const uploadPhotoQuestionHandler = (file: string) => {
    setValue("question", file)
  }
  const uploadPhotoAnswerHandler = (file: string) => {
    setValue("answer", file)
  }

  return (
    <>
      {!isEdit && (
        <SelectButton
          selects={selectProps.selects}
          control={control}
          name={selectProps.name}
          label={selectProps.label}
        />
      )}
      {questionFormat === "Text" && (
        <>
          <TextInput
            control={control}
            label="Question"
            name="question"
            type="text"
            key={"question"}
            rules={{ required: true, minLength: 3 }}
            errors={errors.question}
          />
          <TextInput
            control={control}
            label="Answer"
            name="answer"
            type="text"
            key={"answer"}
            rules={{ required: true, minLength: 1 }}
            errors={errors.answer}
          />
        </>
      )}
      {questionFormat === "Picture" && (
        <>
          <AddImg
            src={question}
            childrenTitleLeft={"Question:"}
            callback={uploadPhotoQuestionHandler}
            marginBottom="22px"
            key={"uploadPhotoQuestionHandler"}
          />
          <AddImg
            src={answer}
            childrenTitleLeft={"Answer:"}
            callback={uploadPhotoAnswerHandler}
            marginBottom="37px"
            key={"uploadPhotoAnswerHandler"}
          />
        </>
      )}
      <ButtonGroupModal buttonTextRight="Save" closeModals={closeModals} type="submit" />
    </>
  )
}
