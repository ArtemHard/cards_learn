import { CheckboxControl } from "components/Checkbox/Checkbox"
import { MS } from "../../Modal.styled"
import { ButtonGroupModal } from "../../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit"
import { Control, FieldValues, Path } from "react-hook-form"
import { TextInput } from "components/Inputs/TextInput/TextInput"

type NewPackFormType<T extends FieldValues> = {
  control: Control<T>
  closeModals: ActionCreatorWithoutPayload<"modals/closeModals">
}
export type NewPackFormProps<T extends FieldValues> = NewPackFormType<T>

export function NewPackForm<T extends FieldValues>({ control, closeModals }: NewPackFormProps<T>) {
  return (
    <>
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
