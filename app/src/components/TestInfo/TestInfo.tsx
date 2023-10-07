import styled from "styled-components"

const testAcc = {
  email: "testAcc@test.com",
  password: 12345678,
}

export const TestInfo = () => {
  return (
    <Warapper>
      <div>
        <span>
          <b>email:</b> {testAcc.email}
        </span>
      </div>
      <div>
        <span>
          <b>password:</b> {12345678}
        </span>
      </div>
    </Warapper>
  )
}

const Warapper = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 2%;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px, rgba(0, 0, 0, 0.1) -1px -1px 2px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  top: 0;
`
