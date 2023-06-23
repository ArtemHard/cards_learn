import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import { headerTableParamsType } from "features/cards/Cards/Cards"

type TableHeaderProps = {
  orderDirection: "asc" | "desc"
  valueToOrderBy: string
  handlerRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  textParams: headerTableParamsType[]
}

export const TableHeader = ({ orderDirection, valueToOrderBy, handlerRequestSort, textParams }: TableHeaderProps) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    handlerRequestSort(event, property)
  }

  return (
    <TableHead sx={{ backgroundColor: "#EFEFEF" }}>
      <TableRow>
        {textParams.map((el) => {
          return (
            <TableCell key={el.dataParams} sx={textHeaderTableStyle} align={el.align}>
              {el.dataParams !== "actions" ? (
                <TableSortLabel
                  active={valueToOrderBy === el.dataParams}
                  direction={valueToOrderBy === el.dataParams ? orderDirection : "asc"}
                  onClick={createSortHandler(el.dataParams)}
                >
                  {el.text}
                </TableSortLabel>
              ) : (
                el.text
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

const textHeaderTableStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fonteHight: 500,
  fontSize: "14px",
  lineHeight: "17px",
  /* identical to box height */
  textAlign: "left",
  color: "#000000",
}
