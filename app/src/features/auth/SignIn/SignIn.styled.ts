import styled from "styled-components"

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`
export const FormModule = styled.form`
  padding: 35px 33px 38px 33px;
  /* margin: 60px 433px 72px 434px; */
  height: 552px;
  width: 413px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1),
    -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

export const TitleForForm = styled.h1`
  font-family: "Montserrat", sans-serif;
  margin-bottom: 41px;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  /* identical to box height */
  color: #000000;
`

export const S = {
  FormWrapper,
  FormModule,
}
