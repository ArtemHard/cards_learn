import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import IconButton from "@mui/material/IconButton"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import { NavLink } from "react-router-dom"
import { formatDate } from "common/utils"
import { maxNameLength } from "common/constants"
import { useActions, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { PackType } from "features/packs/packs.api.types"
import { selectorUserId } from "features/packs/pack.selector"

const longNameCut = (userName: string): string => {
  if (userName.length > maxNameLength) {
    return `${userName.slice(0, maxNameLength - 3)}...`
  }
  return userName
}

type TableBodyPacksProps = {
  packs: PackType[]
}
export const TableBodyPacks = ({ packs }: TableBodyPacksProps) => {
  const userId = useAppSelector(selectorUserId)

  const { removePack, updatePack } = useActions(packsThunks)
  const updateHandler = (pack: PackType) => {
    updatePack({ ...pack, name: "UPDATE_PACK" })
  }

  const deleteHandler = (packId: string) => {
    removePack(packId)
  }

  return (
    <TableBody>
      {packs.map((pack) => (
        <TableRow key={pack._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell sx={textTableStyle} component="th" scope="row">
            <NavLink to={"/cards/" + pack._id} style={{ textDecoration: "none", color: "inherit" }}>
              {longNameCut(pack.name)}
            </NavLink>
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
