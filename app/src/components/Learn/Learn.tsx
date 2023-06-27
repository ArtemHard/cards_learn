import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "features/cards/cards.api.types"
import { useActions, useAppSelector } from "common/hooks"
import { BasicButton } from "components/Button/BasicButton"
import { cardsActions, cardsThunks } from "features/cards/cards.slice"
import { SetRating } from "./SetRating/SetRating"
import styled from "styled-components"
import { selectorPackName } from "../../features/cards/cards.selector"
import { TitleForForm } from "components/Form/Form.styled"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import { P } from "../../features/packs/Packs/Packs.styled"

const grades = ["не знал", "забыл", "долго думал", "перепутал", "знал"]

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
  console.log("test: ", sum, rand, res)

  return cards[res.id + 1]
}

export const Learn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  // const [first, setFirst] = useState<boolean>(0);
  const { cards } = useAppSelector((store) => store.cards)
  const packName = useAppSelector(selectorPackName)
  const { cardId } = useParams()

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
    console.log("LearnContainer useEffect")

    if (first) {
      changeFilterParams({ cardsPack_id: cardId })
      fetchCards()
      setFirst(false)
    }

    console.log("cards", cards)
    if (cards.length > 0) setCard(getCard(cards))

    return () => {
      console.log("LearnContainer useEffect off")
    }
  }, [cardId, cards, first])

  const onNext = () => {
    setIsChecked(false)

    if (cards.length > 0) {
      setCard(getCard(cards))
    } else {
    }
  }

  const changeGradeClickHandlerNext = (newGrade: number) => {
    setIsChecked(false)
    if (cardId) {
      updateGradeCard({ grade: newGrade, card_id: card._id })
      setCard(getCard(cards))
    }
    if (cards.length > 0) {
      setCard(getCard(cards))
    } else {
    }
  }

  const navigate = useNavigate()

  return (
    <P.Wrapper>
      <P.Container>
        <BackNavigateContainer onClick={() => navigate("/packs" + cardId)}>
          <KeyboardBackspaceOutlinedIcon sx={{ marginRight: "8px" }} />
          <Span>Back to Packs List</Span>
        </BackNavigateContainer>
      </P.Container>
      <Container>
        <TitleForForm>Learn "{packName}"</TitleForForm>
        <Wrapper>
          <SpanText>
            <b>Question: </b>
            {card.question}
          </SpanText>
          <GrayText>
            Количество попыток ответов на вопрос: <b>{card.shots}</b>
          </GrayText>

          {!isChecked && <BasicButton buttonText="Show answer" onClick={() => setIsChecked(true)} />}
          {isChecked && (
            <>
              <SpanText>
                <b>Answer: </b>
                {card.answer}
              </SpanText>
              <SetRating callback={onNext} />

              {/* {grades.map((g, i) => (
              <BasicButton buttonText={g} key={"grade-" + i} onClick={() => {}}>
                {g}
              </BasicButton>
            ))}
            <SetRating callback={changeGradeClickHandler} answer={card.answer} /> */}
            </>
          )}
        </Wrapper>
      </Container>
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
