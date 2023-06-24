import React, { useEffect } from "react"
import Pagination, { PaginationProps } from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { useActions, useAppSelector } from "common/hooks"
import { packsActions, packsThunks } from "features/packs/packs.slice"
import { selectorIsLoading } from "app/app.selectors"
import { selectorPacksTotalCount, selectorPage, selectorPageCount } from "features/packs/pack.selector"

// interface PaginationType extends PaginationProps {
//   onChangePage: (page: number) => void
// }
type PaginationRoundedProps = {
  isLoading: boolean
  pageCount: number
  page: number
  cardPacksTotalCount: number
  fetch: () => void
  changeFilterParams: (page: number) => void
}
export const PaginationRounded = () => {
  const isLoading = useAppSelector(selectorIsLoading)
  const pageCount = useAppSelector(selectorPageCount)
  const page = useAppSelector(selectorPage)
  const packsTotalCount = useAppSelector(selectorPacksTotalCount)

  const { fetchPacks } = useActions(packsThunks)
  const { changeFilterParams } = useActions(packsActions)
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    changeFilterParams({ page: page })
    fetchPacks()
  }

  const pagesCount = (cardPacksTotalCount: number, pageCount: number) => Math.ceil(cardPacksTotalCount / pageCount)

  useEffect(() => {}, [])

  useEffect(() => {}, [])
  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesCount(packsTotalCount, pageCount)}
        page={page}
        shape="rounded"
        onChange={handleChange}
        disabled={isLoading}
        color="primary"
      />
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </Stack>
  )
}
