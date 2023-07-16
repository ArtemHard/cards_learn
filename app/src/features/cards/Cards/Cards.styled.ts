import styled from "styled-components"

const Span = styled.span`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height */

  color: #000000;
`
const BackNavigateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid black;
  }
`

export const ParamContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  justify-content: space-between;
  width: 100%;
`
export const CardStyle = {
  ParamContainer,
  BackNavigateContainer,
  Span,
}
