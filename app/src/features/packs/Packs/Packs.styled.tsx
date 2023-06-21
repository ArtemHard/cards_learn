import { ReactNode } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 7% 0 7%;
  /* max-width: 1008px; */
`

type ContainerType = {
  justifyContent?: "flex-start" | "space-between"
}

const Container = styled.div<ContainerType>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : "space-between")};
  align-items: ${(props) => (props.justifyContent === "flex-start" ? "center" : null)};
`
const SpanPageContainer = styled.div`
  margin-left: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  /* identical to box height */

  color: #000000;
`

type ParamContainerType = {
  marginRight?: string
}
const ParamContainer = styled.div<ParamContainerType>`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  justify-content: space-between;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "50px")};
`

const ParamsName = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #000000;
`

export const Span = styled.span`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #000000;
`

export const P = {
  Wrapper,
  Container,
  ParamContainer,
  Title,
  ParamsName,
  Span,
  SpanPageContainer,
}
