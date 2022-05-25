import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShown: false,
  notif: null,
}

export const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    showNotif: (state, action) => {
      state.notif = action.payload
      state.isShown = true
    },
    clearNotif: (state) => {
      state.isShown = false
      state.notif = null
    },
  },
})

export const { showNotif, clearNotif } = notifSlice.actions

export default notifSlice.reducer
