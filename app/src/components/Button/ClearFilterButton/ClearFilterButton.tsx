import React from "react"
import Button from "@mui/material/Button"
import styled from "styled-components"
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined"
import { useActions } from "common/hooks"
import { packsApi } from "features/packs/packs.api"
import { packsActions, packsThunks } from "features/packs/packs.slice"

export const ClearFilterButton = () => {
  const { clearFilter } = useActions(packsActions)
  const { fetchPacks } = useActions(packsThunks)

  const onClickHandler = () => {
    clearFilter()
    fetchPacks()
  }

  return (
    <FilterBtnWrapper>
      <Button
        name="My"
        variant="outlined"
        size="small"
        sx={{
          borderRadius: "2px",
          width: "36px",
          height: "36px",
          textTransform: "none",
          border: "1px solid #D9D9D9",
        }}
        onClick={onClickHandler}
      >
        <FilterAltOffOutlinedIcon style={{ color: "#000000" }} />
      </Button>
    </FilterBtnWrapper>
  )
}

const FilterBtnWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-right: "50px";
`
