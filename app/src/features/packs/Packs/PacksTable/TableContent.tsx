import React, { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { PackType } from "features/packs/packs.api.types"
import { formatDate } from "common/utils"
import { maxNameLength } from "common/constants"
import IconButton from "@mui/material/IconButton"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import { useActions, useAppSelector } from "common/hooks"
import { selectorUserId } from "features/packs/pack.selector"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined"
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined"
import TableSortLabel from "@mui/material/TableSortLabel"
import { TableHeader } from "./TableHeader"

type TableContentPropsType = {
  packs: PackType[]
}

const longNameCut = (userName: string): string => {
  if (userName.length > maxNameLength) {
    return `${userName.slice(0, maxNameLength - 3)}...`
  }
  return userName
}

const headerTableParams: headerTableParamsType[] = [
  { packParams: "name", text: "Name", align: "left" },
  { packParams: "cardsCount", text: "Cards", align: "center" },
  { packParams: "updated", text: "Last Updated", align: "center" },
  { packParams: "user_name", text: "Created by", align: "center" },
  { packParams: "created", text: "Created", align: "right" },
]

export type headerTableParamsType = {
  packParams: Exclude<
    keyof PackType,
    "_id" | "user_id" | "path" | "private" | "path" | "grade" | "shots" | "more_id" | "__v" | "rating" | "type"
  >
  text: string
  align: "left" | "center" | "right"
}

const generateRequestSortString = (orderDirection: "asc" | "desc", valueToOrderBy: keyof PackType) => {
  if (orderDirection === "asc") return "1" + valueToOrderBy
  else return "0" + valueToOrderBy
}

type TableContentType = {
  packs: PackType[]
}

export const TableContent = ({ packs }: TableContentType) => {
  const { changeFilterParams } = useActions(packsActions)
  const { fetchPacks } = useActions(packsThunks)

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")
  const [valueOrderBy, setValueToOrderBy] = useState<keyof PackType>("updated")
  // const [page, setPage] = useState(0)
  // const [rowPerPage, setRowsPerPage] = useState(1)

  const handlerRequestSort = (event: React.MouseEvent<unknown>, property: keyof PackType) => {
    const isAscending = valueOrderBy === property && orderDirection === "asc"
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? "desc" : "asc")

    const dataForRequest = {
      sortPacks: generateRequestSortString(isAscending ? "desc" : "asc", property),
    }

    changeFilterParams(dataForRequest)
    fetchPacks()
  }

  const userId = useAppSelector(selectorUserId)
  const { removePack, updatePack } = useActions(packsThunks)

  const deleteHandler = (packId: string) => {
    removePack(packId)
  }
  const updateHandler = (pack: PackType) => {
    updatePack({ ...pack, name: "UPDATE_PACK" })
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: "24px", marginBottom: "40px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader
          textParams={headerTableParams}
          valueToOrderBy={valueOrderBy}
          orderDirection={orderDirection}
          handlerRequestSort={handlerRequestSort}
        />
        <TableBody>
          {packs.map((pack) => (
            <TableRow key={pack._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell sx={textTableStyle} component="th" scope="row">
                {longNameCut(pack.name)}
              </TableCell>
              <TableCell sx={textTableStyle} align="left">
                {pack.cardsCount}
              </TableCell>
              <TableCell sx={textTableStyle} align="left">
                {formatDate(pack.updated)}
              </TableCell>
              <TableCell sx={textTableStyle} align="left">
                {longNameCut(pack.user_name)}
              </TableCell>
              <TableCell sx={textTableStyle} align="right">
                <IconButton aria-label="read" onClick={() => {}}>
                  <SchoolOutlinedIcon />
                </IconButton>
                {userId === pack.user_id ? (
                  <>
                    <IconButton aria-label="update" onClick={() => updateHandler(pack)}>
                      <CreateOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => deleteHandler(pack._id)}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const textTableStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "16px",
  color: "#000000",
}
