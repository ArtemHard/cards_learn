import { emptyFriendPackAlertText, emptyUserPackAlertText } from "common/constants"
import { useAppSelector } from "common/hooks"
import { BasicButton } from "components/Button/BasicButton"
import { TextLinkBlock } from "components/Form/Form.styled"
import { selectIsUserPack } from "features/cards/cards.selector"
import styled from "styled-components"

type EmptyPackProps = {
  onClickHandler?: () => void
}
export const EmptyPack = ({ onClickHandler }: EmptyPackProps) => {
  const isUserPack = useAppSelector(selectIsUserPack)

  return (
    <EmptyPackWrapper>
      <TextLinkBlock innerText={isUserPack ? emptyUserPackAlertText : emptyFriendPackAlertText}></TextLinkBlock>
      {isUserPack && <BasicButton buttonText="Add new card" width="171px" onClick={onClickHandler} />}
    </EmptyPackWrapper>
  )
}

const EmptyPackWrapper = styled.div`
  width: 100%;
  margin-top: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
