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
    setUserState: (state, action) => {
      state.user = action.payload
    },
    login: (state, action) => {
      state.user = action.payload
      setCookie(undefined, 'token', action.payload.token, { path: '/' })
      setCookie(undefined, 'uid', action.payload.uid, { path: '/' })
    },
    logout: (state) => {
      state.user = null
      setCookie(undefined, 'token', '', { path: '/' })
      setCookie(undefined, 'uid', '', { path: '/' })
      setCookie(undefined, 'regInput', '', { path: '/' })
    },
  },
})

export const { login, logout, setUserState } = userSlice.actions

export default userSlice.reducer
