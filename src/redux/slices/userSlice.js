import { createSlice } from '@reduxjs/toolkit'
import { setCookie } from 'nookies'

const initialState = {
  isLoading: false,
  user: {
    email: '',
    token: '',
    uid: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.user = action.payload
    },
    login: (state) => {
      setCookie(undefined, 'token', state.user.token, { path: '/' })
      setCookie(undefined, 'uid', state.user.uid, { path: '/' })
    },
    logout: (state) => {
      state.user = null
      setCookie(undefined, 'token', '', { path: '/' })
      setCookie(undefined, 'uid', '', { path: '/' })
      setCookie(undefined, 'regInput', '', { path: '/' })
      setCookie(undefined, 'email', '', { path: '/' })
    },
  },
})

export const { login, logout, setUserState } = userSlice.actions

export default userSlice.reducer
