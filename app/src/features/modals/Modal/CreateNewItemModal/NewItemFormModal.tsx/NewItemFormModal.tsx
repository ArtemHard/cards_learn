import React from "react"
import { MS } from "../../Modal.styled"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import { Control, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form"
import { useModals } from "common/hooks/useModals"
import { useAppSelector } from "common/hooks"
import { CheckboxControl } from "components/Checkbox/Checkbox"
import { BasicButton } from "components/Button/BasicButton"
import { ButtonGroupModal } from "../../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { P } from "features/packs/Packs/Packs.styled"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

export type NewItemFormModal = {
  questionFormat: "Text"
  question: string
  answer: string
  namePack: string
  privatePack: boolean
}
type NewItemFormModalProps = {
  submitHandler: (data: NewItemFormModal) => void
}
export const NewItemFormModal = ({ submitHandler }: NewItemFormModalProps) => {
  const { selectors, actions } = useModals()
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
    submitHandler(data)
  }

  return (
    <MS.FormModal onSubmit={handleSubmit(onSubmit)}>
      {/* // <form 
        // style={style} 
        // onSubmit={handleSubmit(onSubmit)}
        // > */}

      {/* <TextInput control={control} label="Name pack" name="namePack" type="text" margin="0px" />
      <CheckboxControl control={control} label={<MS.CheckBoxText>Private pack</MS.CheckBoxText>} name="privatePack" />
      <ButtonGroupModal buttonTextRight="Save" closeModals={actions.closeModals} type="submit" /> */}
      <NewPackForm control={control} closeModals={actions.closeModals} />
      {/* // </form> */}
    </MS.FormModal>
  )
}

type NewPackFormType<T extends FieldValues> = {
  control: Control<T>
  closeModals: ActionCreatorWithPayload<any, "modals/closeModals">
}
export type NewPackFormProps<T extends FieldValues> = NewPackFormType<T>

function NewPackForm<T extends FieldValues>({ control, closeModals }: NewPackFormProps<T>) {
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
