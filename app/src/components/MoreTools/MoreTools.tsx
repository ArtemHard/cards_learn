import React from "react"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import MoreIcon from "@mui/icons-material/MoreVert"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import { useActions, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { useNavigate, useParams } from "react-router-dom"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import { ItemMenu } from "./ItemMenu/ItemMenu"
import { modalActions } from "features/modals/modal.slice"
import { selectorCards, selectorPackName } from "features/cards/cards.selector"

type MoreToolsProps = {
  packId: string | undefined
}

export const MoreTools = ({ packId }: MoreToolsProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { removePack, updatePack } = useActions(packsThunks)
  const { setDataModal, toggleModal } = useActions(modalActions)
  const packName = useAppSelector(selectorPackName)
  const navigate = useNavigate()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const removePackOpenModal = () => {
    if (packId && packName) {
      setDataModal({ type: "Pack", _id: packId, answer: "", question: "", name: packName })
      toggleModal({ isDelete: true })
      handleCloseUserMenu()
    }
  }

  const updatePackOpenModal = () => {
    if (packId && packName) {
      setDataModal({ type: "Pack", _id: packId, answer: "", question: "", name: packName })
      toggleModal({ isEdit: true })
      handleCloseUserMenu()
    }
  }

  const learnPackNavigate = () => {
    navigate("/learn/" + packId)
  }

  React.useEffect(() => {}, [])

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <ItemMenu
          key={"Learn Cards"}
          innerText="Learn Cards"
          callback={learnPackNavigate}
          childrenIcon={<SchoolOutlinedIcon />}
        />

        <ItemMenu
          key={"Edit Pack"}
          innerText="Edit Pack"
          callback={updatePackOpenModal}
          childrenIcon={<CreateOutlinedIcon />}
        />

        <ItemMenu
          key={"Delete Pack"}
          innerText="Delete Pack"
          callback={removePackOpenModal}
          childrenIcon={<DeleteOutlinedIcon />}
        />
      </Menu>
    </>
  )
}
