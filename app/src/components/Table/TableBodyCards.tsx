import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { NavLink } from "react-router-dom"
import { formatDate } from "common/utils"
import { Card } from "features/cards/cards.api.types"
import { maxNameLength } from "common/constants"
import Rating from "@mui/material/Rating"
import { useActions, useAppSelector } from "common/hooks"
import { selectIsUserPack } from "features/cards/cards.selector"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import IconButton from "@mui/material/IconButton"
import styled from "styled-components"
import { modalActions } from "features/modals/modal.slice"
import { useEffect } from "react"

type TableBodyContentProps = {
  cards: Card[]
}
export const TableBodyCards = ({ cards }: TableBodyContentProps) => {
  const isUserPack = useAppSelector(selectIsUserPack)
  const { setDataModal, toggleModal } = useActions(modalActions)

  const deleteClickHandler = (card: Card) => {
    const { _id, answer, question } = card
    setDataModal({ type: "Card", _id, answer, question, name: "Card" })
    toggleModal({ isDelete: true })
  }

  const updateClickHandler = (card: Card) => {
    const { _id, answer, question } = card
    setDataModal({ type: "Card", _id, answer, question, name: "Card" })
    toggleModal({ isEdit: true })
  }

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
            <GradeContainer>
              <Rating name="read-only" value={card.grade} readOnly />
              {isUserPack && (
                <div>
                  <IconButton aria-label="update" onClick={() => updateClickHandler(card)}>
                    <CreateOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteClickHandler(card)}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                </div>
              )}
            </GradeContainer>
          </TableCell>
          {/* {isUserPack && (
            <TableCell sx={textTableStyle} align="left">
              {formatDate(card.updated)}
            </TableCell>
          )} */}
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

const GradeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
