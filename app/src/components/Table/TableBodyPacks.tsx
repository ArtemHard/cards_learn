import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import IconButton from "@mui/material/IconButton"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import { NavLink, useNavigate } from "react-router-dom"
import { formatDate } from "common/utils"
import { maxNameLength } from "common/constants"
import { useActions, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { PackType } from "features/packs/packs.api.types"
import { selectorUserId } from "features/packs/pack.selector"
import { modalActions } from "features/modals/modal.slice"
import { ImageCard } from "components/AddImg/AddImg"
import stubPicture from "../../common/assets/icons/reactJS.png"

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
  const { toggleModal, setDataModal } = useActions(modalActions)
  const navigate = useNavigate()
  // const { removePack, updatePack } = useActions(packsThunks)
  const updateHandler = (pack: PackType) => {
    toggleModal({ isEdit: true })
    setDataModal({ _id: pack._id, answer: "", question: "", name: pack.name, type: "Pack", deckCover: pack.deckCover })
    // updatePack({ ...pack, name: "UPDATE_PACK" })
  }

  const deleteHandler = (pack: PackType) => {
    setDataModal({ type: "Pack", _id: pack._id, answer: "", question: "", name: pack.name })
    toggleModal({ isDelete: true })
    // removePack(packId)
  }

  const learnPackHandler = (id: string) => {
    navigate("/learn/" + id)
  }

  return (
    <TableBody>
      {packs.map((pack) => (
        <TableRow key={pack._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell sx={textTableStyle} component="th" scope="row">
            <NavLink to={"/cards/" + pack._id} style={NavLinkStyleTableBodyPacks}>
              {<ImageCard src={!!pack.deckCover ? pack.deckCover : stubPicture} width="auto" height="36px" />}
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
            <IconButton
              aria-label="read"
              disabled={!pack.cardsCount}
              onClick={() => {
                learnPackHandler(pack._id)
              }}
            >
              <SchoolOutlinedIcon />
            </IconButton>
            {userId === pack.user_id ? (
              <>
                <IconButton aria-label="update" onClick={() => updateHandler(pack)}>
                  <CreateOutlinedIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteHandler(pack)}>
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

const NavLinkStyleTableBodyPacks = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "flex-end",
  gap: "10px",
}
