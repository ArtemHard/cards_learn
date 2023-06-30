import React from "react"
import styled from "styled-components"
import { BasicModal } from "../BasicModal"
import { useAppSelector } from "common/hooks"
import { selectorIsDeleteModal } from "features/modals/modal.selector"

export const DeleteModal = () => {
  const open = useAppSelector(selectorIsDeleteModal)
  return (
    <BasicModal open={open}>
      <TitleContainer>
        <Title>Delete</Title>
      </TitleContainer>
    </BasicModal>
  )
}

const Title = styled.h2`
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
const TitleContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 19 24 19 24;
`
