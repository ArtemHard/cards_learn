import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "features/cards/cards.api.types"
import { useActions, useAppSelector } from "common/hooks"
import { BasicButton } from "components/Button/BasicButton"
import { cardsActions, cardsThunks } from "features/cards/cards.slice"
import { SetRating } from "./SetRating/SetRating"
import styled from "styled-components"
import { selectorCards, selectorPackName } from "../../features/cards/cards.selector"
import { TitleForForm } from "components/Form/Form.styled"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import { P } from "../../features/packs/Packs/Packs.styled"
import { ImageCard } from "components/AddImg/AddImg"
import { selectorIsLoading } from "app/app.selectors"

const getCard = (cards: Card[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const Learn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const cards = useAppSelector(selectorCards)
  const isLoading = useAppSelector(selectorIsLoading)
  const packName = useAppSelector(selectorPackName)
  const { pack_id } = useParams()
  console.log(pack_id + "11111111111111111111")

  const [card, setCard] = useState<Card>({
    _id: "fake",
    cardsPack_id: "",
    answer: "answer fake",
    question: "question fake",
    grade: 0,
    shots: 0,
    user_id: "",
    created: "",
    updated: "",
  })

  const { fetchCards, updateGradeCard } = useActions(cardsThunks)
  const { changeFilterParams } = useActions(cardsActions)

  useEffect(() => {
    if (first) {
      changeFilterParams({ cardsPack_id: pack_id, pageCount: 100 })
      fetchCards()
      setFirst(false)
    }

    if (cards.length > 0) setCard(getCard(cards))

    return () => {}
  }, [pack_id, cards, first])

  const changeGradeClickHandlerNext = (newGrade: number) => {
    setIsChecked(false)
    if (pack_id) {
      updateGradeCard({ grade: newGrade, card_id: card._id })
      // setCard(getCard(cards))
    }
    // if (cards.length > 0) {
    //   setCard(getCard(cards))
    // } else {
    // }
  }

  const navigate = useNavigate()
  return (
    <P.Wrapper>
      <P.Container>
        <BackNavigateContainer onClick={() => navigate("/cards/" + pack_id)}>
          <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "8px" }} />
          <Span>Back to Packs List</Span>
        </BackNavigateContainer>
      </P.Container>
      {!isLoading && (
        <Container>
          <TitleForForm>Learn "{packName}"</TitleForForm>
          <Wrapper>
            {card.question !== "no question" ? (
              <SpanText>
                <b>Question: </b>
                {card.question}
              </SpanText>
            ) : (
              <>
                <SpanText>
                  <b>Question: </b>
                </SpanText>
                {<ImageCard key={"questionImg"} src={card.questionImg} />}
              </>
            )}
            <GrayText>
              Количество попыток ответов на вопрос: <b>{card.shots}</b>
            </GrayText>

            {!isChecked && <BasicButton buttonText="Show answer" onClick={() => setIsChecked(true)} />}
            {isChecked && card.answer !== "no answer" && (
              <>
                <SpanText>
                  <b>Answer: </b>
                  {card.answer}
                </SpanText>
                <SetRating callback={changeGradeClickHandlerNext} />
              </>
            )}
            {isChecked && card.answerImg && (
              <>
                <SpanText>
                  <b>Answer: </b>
                </SpanText>
                {<ImageCard key={"answerImg"} src={card.answerImg} />}
                <SetRating callback={changeGradeClickHandlerNext} />
              </>
            )}
          </Wrapper>
        </Container>
      )}
    </P.Wrapper>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 27px;
  /* height: 100vh; */
`
const Wrapper = styled.div`
  padding: 35px 33px 38px 33px;
  /* margin: 60px 433px 72px 434px; */
  height: 100%;
  width: 413px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;

  background: #ffffff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`
const SpanText = styled.span`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  /* letter-spacing: 0em; */
  /* text-align: left; */
`
const GrayText = styled.span`
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  opacity: 50%;
  margin-bottom: 35px;
  margin-top: 13px;
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

const Span = styled.span`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height */

  color: #000000;
`
