import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShown: false,
  notif: null,
  type: 'error'
}

export const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    showNotif: (state, action) => {
      state.notif = action.payload.message
      state.isShown = true
      state.type = action.payload.type
    },
    clearNotif: (state) => {
      state.isShown = false
      state.notif = null
    },
  },
})

export const { showNotif, clearNotif } = notifSlice.actions

export default notifSlice.reducer
