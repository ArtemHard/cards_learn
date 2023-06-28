import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Card } from "features/cards/cards.api.types"
import styled from "styled-components"
import { BasicButton } from "components/Button/BasicButton"

const grades = ["не знал", "забыл", "долго думал", "перепутал", "знал"]
// type NumericString =
type ratingFromType = Pick<Card, "grade">

type SetRatingProps = {
  callback: (newGrade: number) => void
  //   answer: string
}

export const SetRating = ({ callback }: SetRatingProps) => {
  const { register, handleSubmit, control } = useForm<ratingFromType>({
    defaultValues: {
      grade: 1,
    },
  })

  const onSubmit: SubmitHandler<ratingFromType> = (data) => {
    callback(+data.grade)
  }
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {/* <h3>Answer:</h3> */}
      {/* <span>{answer}</span> */}
      <Controller
        name={"grade"}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl {...field} sx={{ marginBottom: "42px" }}>
            <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
              Rate yourself:
            </FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" defaultValue={"1"}>
              {grades.map((text, index) => {
                return <FormControlLabel key={text} value={index + 1} control={<Radio />} label={text} />
              })}
            </RadioGroup>
          </FormControl>
        )}
      />
      <BasicButton type="submit" buttonText="Next" width="100%" />
    </FormWrapper>
  )
}

const textStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000 !important",
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`
