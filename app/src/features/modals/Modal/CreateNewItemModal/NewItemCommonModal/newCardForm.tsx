import SelectButton, { SelectButtonProps } from "components/Selector/SelectButton"
import React from "react"
import InputLabel from "@mui/material/InputLabel"
import { TextInput } from "components/Inputs/TextInput/TextInput"
import styled from "styled-components"
import { ButtonGroupModal } from "../../HeaderModal/ButtonGroupModal/ButtonGroupModal"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

type NewCardFormProps = {
  selectProps: Omit<SelectButtonProps, "control">
  closeModals: ActionCreatorWithPayload<any, "modals/closeModals">
} & Pick<SelectButtonProps, "control">

export const NewCardForm = ({ control, selectProps, closeModals }: NewCardFormProps) => {
  return (
    <>
      <SelectButton selects={selectProps.selects} control={control} name={selectProps.name} label={selectProps.label} />
      <TextInput
        control={control}
        label="Question"
        name="question"
        type="text"
        key={"question"}
        rules={{ required: true, minLength: 5 }}
      />
      <TextInput
        control={control}
        label="Answer"
        name="answer"
        type="text"
        key={"answer"}
        rules={{ required: true, minLength: 5 }}
      />
      <ButtonGroupModal buttonTextRight="Save" closeModals={closeModals} />
    </>
  )
}
