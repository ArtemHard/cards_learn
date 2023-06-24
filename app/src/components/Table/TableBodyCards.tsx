import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { NavLink } from "react-router-dom"
import { formatDate } from "common/utils"
import { Card } from "features/cards/cards.api.types"
import { maxNameLength } from "common/constants"

type TableBodyContentProps = {
  cards: Card[]
}
export const TableBodyCards = ({ cards }: TableBodyContentProps) => {
  // const { deleteCard, updateCard } = useActions(cardsThunks)

  // const userId = useAppSelector(selectorUserId)

  // const deleteHandler = (_id: string) => {
  //   deleteCard({ _id })
  // }
  // const updateHandler = (card: Card) => {
  //   updateCard({ ...card, question: "UPDATEd_Card" })
  // }

  return (
    <TableBody>
      {cards.map((card) => (
        <TableRow key={card._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell sx={textTableStyle} component="th" scope="row">
            <NavLink to={"/cards/" + card._id} style={{ textDecoration: "none", color: "inherit" }}>
              {longNameCut(card.question)}
            </NavLink>
          </TableCell>
          <TableCell sx={textTableStyle} align="left">
            {card.answer}
          </TableCell>
          <TableCell sx={textTableStyle} align="left">
            {formatDate(card.updated)}
          </TableCell>
          <TableCell sx={textTableStyle} align="left">
            {card.grade}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

const longNameCut = (userName: string): string => {
  if (userName.length > maxNameLength) {
    return `${userName.slice(0, maxNameLength - 3)}...`
  }
  return userName
}

const textTableStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "16px",
  color: "#000000",
}
