import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card } from "features/cards/cards.api.types"
import { useActions, useAppSelector } from "common/hooks"
import { BasicButton } from "components/Button/BasicButton"
import { cardsActions, cardsThunks } from "features/cards/cards.slice"
import { SetRating } from "./SetRating/SetRating"

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

  const changeGradeClickHandler = (newGrade: number) => {
    if (cardId) updateGradeCard({ grade: newGrade, card_id: card._id })
  }

  return (
    <div>
      LearnPage
      <div>{card.question}</div>
      <div>
        <BasicButton buttonText="check" onClick={() => setIsChecked(true)}>
          check
        </BasicButton>
      </div>
      {isChecked && (
        <>
          <div>{card.answer}</div>

          {grades.map((g, i) => (
            <BasicButton buttonText={g} key={"grade-" + i} onClick={() => {}}>
              {g}
            </BasicButton>
          ))}
          <SetRating callback={changeGradeClickHandler} answer={card.answer} />
          <div>
            <BasicButton buttonText="next" onClick={onNext}>
              next
            </BasicButton>
          </div>
        </>
      )}
    </div>
  )
}
