import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import { PackType } from "features/packs/packs.api.types"
import { useActions } from "common/hooks"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { TableHeader } from "components/Table/TableHeader"
import { headerTableParamsType } from "features/cards/Cards/Cards"
import { TableBodyPacks } from "components/Table/TableBodyPacks"

const headerTableParams: headerTableParamsType[] = [
  { dataParams: "name", text: "Name", align: "left" },
  { dataParams: "cardsCount", text: "Cards", align: "center" },
  { dataParams: "updated", text: "Last Updated", align: "center" },
  { dataParams: "user_name", text: "Created by", align: "center" },
  { dataParams: "actions", text: "Actions", align: "right" },
]

const generateRequestSortString = (orderDirection: "asc" | "desc", valueToOrderBy: string) => {
  if (orderDirection === "asc") return "1" + valueToOrderBy
  else return "0" + valueToOrderBy
}

type TableContentType = {
  packs: PackType[]
}

export const TablePacks = ({ packs }: TableContentType) => {
  const { changeFilterParams } = useActions(packsActions)
  const { fetchPacks } = useActions(packsThunks)

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")
  const [valueOrderBy, setValueToOrderBy] = useState<string>("0updated")

  const handlerRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAscending = valueOrderBy === property && orderDirection === "asc"
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? "desc" : "asc")

    const dataForRequest = {
      sortPacks: generateRequestSortString(isAscending ? "desc" : "asc", property),
    }

    changeFilterParams(dataForRequest)
    fetchPacks()
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
        <TableBodyPacks packs={packs} />
      </Table>
    </TableContainer>
  )
}
