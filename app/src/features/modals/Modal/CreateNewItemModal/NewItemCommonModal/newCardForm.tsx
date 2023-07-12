import SelectButton, { SelectButtonProps } from "components/Selector/SelectButton"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { ButtonGroupModal } from "../../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { InputTypeFile } from "components/Inputs/InputTypeFile"
import { UseFormSetValue } from "react-hook-form"
import { NewItemCommonInputs } from "./NewItemCommonModal"
import { AddImg } from "components/AddImg/AddImg"

type NewCardFormProps = {
  selectProps: Omit<SelectButtonProps, "control">
  closeModals: ActionCreatorWithPayload<any, "modals/closeModals">
  questionFormat: "Text" | "Picture"
  setValue: UseFormSetValue<NewItemCommonInputs>
  question: string
  answer: string
} & Pick<SelectButtonProps, "control">

export const NewCardForm = ({
  control,
  selectProps,
  closeModals,
  questionFormat,
  question,
  answer,
  setValue,
}: NewCardFormProps) => {
  const uploadPhotoQuestionHandler = (file: string) => {
    setValue("question", file)
  }
  const uploadPhotoAnswerHandler = (file: string) => {
    setValue("answer", file)
  }
  return (
    <>
      <SelectButton selects={selectProps.selects} control={control} name={selectProps.name} label={selectProps.label} />
      {questionFormat === "Text" && (
        <>
          <TextInput
            control={control}
            label="Question"
            name="question"
            type="text"
            key={"question"}
            rules={{ required: true, minLength: 1 }}
          />

          <TextInput
            control={control}
            label="Answer"
            name="answer"
            type="text"
            key={"answer"}
            rules={{ required: true, minLength: 5 }}
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
          />
          <AddImg src={answer} childrenTitleLeft={"Answer:"} callback={uploadPhotoAnswerHandler} marginBottom="37px" />
        </>
      )}
      <ButtonGroupModal buttonTextRight="Save" closeModals={closeModals} type="submit" />
    </>
  )
}
