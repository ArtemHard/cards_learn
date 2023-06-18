import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { maxNameLength } from "common/constants"
import TableSortLabel from "@mui/material/TableSortLabel"
import { headerTableParamsType, keyFromPackType } from "./TableContent"

const longNameCut = (userName: string): string => {
  if (userName.length > maxNameLength) {
    return `${userName.slice(0, maxNameLength - 3)}...`
  }
  return userName
}

type TableHeaderProps = {
  orderDirection: "asc" | "desc"
  valueToOrderBy: keyFromPackType
  handlerRequestSort: (event: React.MouseEvent<unknown>, property: keyFromPackType) => void
  textParams: headerTableParamsType[]
}

export const TableHeader = ({ orderDirection, valueToOrderBy, handlerRequestSort, textParams }: TableHeaderProps) => {
  const createSortHandler = (property: keyFromPackType) => (event: React.MouseEvent<unknown>) => {
    handlerRequestSort(event, property)
  }

  return (
    <TableHead sx={{ backgroundColor: "#EFEFEF" }}>
      <TableRow>
        {textParams.map((el) => {
          return (
            <TableCell key={el.packParams} sx={textHeaderTableStyle} align={el.align}>
              {el.packParams !== "actions" ? (
                <TableSortLabel
                  active={valueToOrderBy === el.packParams}
                  direction={valueToOrderBy === el.packParams ? orderDirection : "asc"}
                  onClick={createSortHandler(el.packParams)}
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
