import { CheckboxControl } from "components/Checkbox/Checkbox"
import { MS } from "../../Modal.styled"
import { ButtonGroupModal } from "../../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit"
import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { AddImg } from "components/AddImg/AddImg"
import { NewItemCommonInputs } from "./NewItemCommonModal"

type NewPackFormType<T extends FieldValues> = {
  control: Control<T>
  closeModals: ActionCreatorWithoutPayload<"modals/closeModals">
  setValue: UseFormSetValue<NewItemCommonInputs>
} & Pick<NewItemCommonInputs, "deckCover">
export type NewPackFormProps<T extends FieldValues> = NewPackFormType<T>

export function NewPackForm<T extends FieldValues>({ control, closeModals, deckCover, setValue }: NewPackFormProps<T>) {
  const uploadDeckCover = (file: string) => {
    setValue("deckCover", file)
  }
  return (
    <>
      <AddImg src={deckCover} callback={uploadDeckCover} childrenTitleLeft="Cover" key={"Cover"} marginBottom="25px" />
      <TextInput control={control} label="Name pack" name={"namePack" as Path<T>} type="text" margin="0px" />
      <CheckboxControl
        control={control}
        label={<MS.CheckBoxText>Private pack</MS.CheckBoxText>}
        name={"privatePack" as Path<T>}
      />
      <ButtonGroupModal buttonTextRight="Save" closeModals={closeModals} type="submit" />
    </>
  )
}
