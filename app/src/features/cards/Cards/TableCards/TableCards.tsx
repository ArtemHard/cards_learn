import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import { PackType } from "features/packs/packs.api.types"
import { useActions, useAppSelector } from "common/hooks"
import { selectorUserId } from "features/packs/pack.selector"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { Card } from "features/cards/cards.api.types"
import { TableHeader } from "../../../../components/Table/TableHeader"
import { headerTableParamsType } from "features/cards/Cards/Cards"
import { TableBodyCards } from "../../../../components/Table/TableBodyCards"

const generateRequestSortString = (orderDirection: "asc" | "desc", valueToOrderBy: string) => {
  if (orderDirection === "asc") return "1" + valueToOrderBy
  else return "0" + valueToOrderBy
}

type TableContentRefactProps = {
  data: Card[]
  headerParams: headerTableParamsType[]
}

export const TableCards = ({ data, headerParams }: TableContentRefactProps) => {
  const { changeFilterParams } = useActions(packsActions)
  const { fetchPacks } = useActions(packsThunks)

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")
  const [valueOrderBy, setValueToOrderBy] = useState<string>("updated")
  // const [page, setPage] = useState(0)
  // const [rowPerPage, setRowsPerPage] = useState(1)

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
          textParams={headerParams}
          valueToOrderBy={valueOrderBy}
          orderDirection={orderDirection}
          handlerRequestSort={handlerRequestSort}
        />
        <TableBodyCards cards={data} />
      </Table>
    </TableContainer>
  )
}
