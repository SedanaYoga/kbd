import { createSlice } from '@reduxjs/toolkit'
import { setCookie } from 'nookies'

const initialState = {
  isLoading: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      setCookie(undefined, 'token', action.payload.token, { path: '/' })
      setCookie(undefined, 'uid', action.payload.uid, {path: '/'})
    },
    logout: (state) => {
      state.user = null
      setCookie(undefined, 'token', '', { path: '/' })
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
