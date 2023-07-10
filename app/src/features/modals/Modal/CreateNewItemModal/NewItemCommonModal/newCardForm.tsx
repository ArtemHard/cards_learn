import SelectButton, { SelectButtonProps } from "components/Selector/SelectButton"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { ButtonGroupModal } from "../../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { InputTypeFile } from "components/Inputs/InputTypeFile"
import { UseFormSetValue } from "react-hook-form"
import { NewItemCommonInputs } from "./NewItemCommonModal"

type NewCardFormProps = {
  selectProps: Omit<SelectButtonProps, "control">
  closeModals: ActionCreatorWithPayload<any, "modals/closeModals">
  questionFormat: "Text" | "Picture"
  setValue: UseFormSetValue<NewItemCommonInputs>
} & Pick<SelectButtonProps, "control">

export const NewCardForm = ({ control, selectProps, closeModals, questionFormat, setValue }: NewCardFormProps) => {
  const uploadPhotoHandler = (file: string) => {
    setValue("question", file)
  }
  return (
    <>
      <SelectButton selects={selectProps.selects} control={control} name={selectProps.name} label={selectProps.label} />
      {questionFormat === "Text" && (
        <TextInput
          control={control}
          label="Question"
          name="question"
          type="text"
          key={"question"}
          rules={{ required: true, minLength: 1 }}
        />
      )}
      {questionFormat === "Picture" && (
        <InputTypeFile type="button" marginBottom={"24px"} callback={uploadPhotoHandler} />
      )}
      <TextInput
        control={control}
        label="Answer"
        name="answer"
        type="text"
        key={"answer"}
        rules={{ required: true, minLength: 5 }}
      />
      <ButtonGroupModal buttonTextRight="Save" closeModals={closeModals} type="submit" />
    </>
  )
}
