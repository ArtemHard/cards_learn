import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ModalShowBoolean = Partial<typeof initialState.modalShow>
const initialState = {
  id: "",
  name: "",
  question: "",
  answer: "",
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
    setDataModal: (state, action: PayloadAction<Omit<typeof initialState, "modalShow">>) => {
      const data = action.payload
      state.id = data.id
      state.name = data.name
      state.question = data.question
      state.answer = data.answer
    },
    closeModals: (state, action) => {
      state.modalShow = initialState.modalShow
    },
  },
})

export const modalReducer = slice.reducer
export const modalActions = slice.actions
