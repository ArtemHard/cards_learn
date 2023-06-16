import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import Button from "@mui/material/Button"
import styled from "styled-components"
import { P } from "../../../features/packs/Packs/Packs.styled"

function valuetext(value: number) {
  return `${value}°C`
}

export default function SliderBlock() {
  const [value, setValue] = React.useState<number[]>([20, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  // MinCardsCount MaxCards
  return (
    <P.ParamContainer>
      <P.ParamsName>Number of cards</P.ParamsName>
      <Wrapper>
        <Button
          name="My"
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "2px",
            width: "36px",
            height: "36px",
            textTransform: "none",
            border: "1px solid #D9D9D9",
          }}
          // onClick={handleChange}
        >
          <NumberInBtn>{value[0]}</NumberInBtn>
        </Button>
        <Box sx={{ width: 155 }}>
          <Slider
            min={0}
            max={110}
            defaultValue={1}
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
        <Button
          name="My"
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "2px",
            width: "36px",
            height: "36px",
            textTransform: "none",
            border: "1px solid #D9D9D9",
          }}
          // onClick={handleChange}
        >
          <NumberInBtn>{value[1]}</NumberInBtn>
        </Button>
      </Wrapper>
    </P.ParamContainer>
  )
}

// border: 1px solid #D9D9D9;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 12px;
`
const NumberInBtn = styled.span`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #000000;
`
