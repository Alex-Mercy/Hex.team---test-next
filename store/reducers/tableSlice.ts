import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateType = {
  isLoaded: boolean
  error: null | string
  currentPage: number
  limit: number
  totalCount: number
  sortBy: string
  isAscOrder: boolean
  filter: string
  searchValue: string
}

const initialState: StateType = {
  isLoaded: false,
  error: null,
  currentPage: 1,
  limit: 10,
  totalCount: 22,
  sortBy: 'name',
  isAscOrder: true,
  filter: 'includes',
  searchValue: '',
}

// export const tableSlice = createSlice({
//   name: 'table',
//   initialState,
//   reducers: {
//     setCurrentPage(state, action: PayloadAction<DialogType>) {
//     //   state.dialog.push(action.payload)
//     },
//   },
// })
