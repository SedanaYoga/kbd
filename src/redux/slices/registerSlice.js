import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inputUser: null,
}

export const registerSlice = createSlice({
  name: 'regInput',
  initialState,
  reducers: {
    setRegInput: (state, action) => {
      state.inputUser = action.payload
    },
    clearRegInput: (state) => {
      state.inputUser = null
    },
  },
})

export const { setRegInput, clearRegInput } = registerSlice.actions

export default registerSlice.reducer
