import { HTMLAttributes } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 36px 7% 0 7%;
`

type ContainerType = HTMLAttributes<HTMLDivElement> & {
  justifyContent?: "flex-start" | "space-between"
  width?: string
  alignItems?: "center"
  margin?: string
}

const Container = styled.div<ContainerType>`
  margin: ${(props) => (props.margin ? props.margin : undefined)};
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : "space-between")};
  align-items: ${(props) => (props.justifyContent === "flex-start" ? "center" : props.alignItems)};
  width: ${(props) => (props.width ? props.width : undefined)};
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
  margin: 0;
  /* identical to box height */

  color: #000000;
`

type ParamContainerType = {
  marginRight?: string
  width?: string
}
const ParamContainer = styled.div<ParamContainerType>`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  justify-content: space-between;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "50px")};
  width: ${(props) => (props.width ? props.width : undefined)};
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
