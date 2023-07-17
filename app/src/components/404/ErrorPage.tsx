// import { useRouteError } from "react-router-dom"

// export default function ErrorPage() {
//   const error: unknown = useRouteError()
//   return (
//     <div id="error-page" className="flex flex-col gap-8 justify-center items-center h-screen">
//       <h1 className="text-4xl font-bold">Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p className="text-slate-400">
//         <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
//       </p>
//     </div>
//   )
// }

import React, { useCallback } from "react"
import notFound from "../../common/assets/pages/400.svg"
import { useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { PATH } from "routes/path"
import { BasicButton } from "components/Button/BasicButton"
import styled from "styled-components"

export const PageNotFound = () => {
  const navigate = useNavigate()
  const toPacks = useCallback(() => navigate(PATH.PACKS), [])
  return (
    <Grid
      container
      height={"100vh"}
      width={"100%"}
      spacing={5}
      margin={"0 auto"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Grid item>
          <Box component={"span"} sx={{ fontSize: "50px", fontWeight: "600" }}>
            Ooops!
          </Box>
        </Grid>
        <Grid item>
          {/* <Typography>Sorry! Page not Found!</Typography> */}
          <Message>Sorry! Page not Found!</Message>
        </Grid>
        <Grid item>
          <BasicButton
            onClick={toPacks}
            buttonText={"Back to home page!"}
            // textColor={'white'}
            // rounded={true}
          />
        </Grid>
      </Grid>
      <Grid item>
        <img src={notFound} alt="Page not found" />
      </Grid>
    </Grid>
  )
}

const Message = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
`
