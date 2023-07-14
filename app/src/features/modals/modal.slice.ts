import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ModalShowBoolean = Partial<typeof initialState.modalShow>

type ModalState = {
  _id: string
  name: string
  question: string
  answer: string
  type: "Pack" | "Card"
  deckCover?: string | null
  modalShow: {
    isDelete: boolean
    isCreateNew: boolean
    isEdit: boolean
  }
}

const initialState: ModalState = {
  _id: "",
  name: "",
  question: "",
  answer: "",
  type: "" as "Pack" | "Card",
  modalShow: {
    isDelete: false,
    isCreateNew: false,
    isEdit: false,
  },
}

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ModalShowBoolean>) => {
      state.modalShow = { ...state.modalShow, ...action.payload }
    },
    setDataModal: (
      state,
      action: PayloadAction<Omit<typeof initialState, "modalShow"> & { type: "Pack" | "Card" }>
    ) => {
      const data = action.payload
      state._id = data._id
      state.name = data.name
      state.question = data.question
      state.answer = data.answer
      state.type = data.type
      state.deckCover = data.deckCover
    },
    closeModals: (state, action: PayloadAction) => {
      state.modalShow = initialState.modalShow
    },
  },
})

export const modalReducer = slice.reducer
export const modalActions = slice.actions
