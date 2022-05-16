import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPuppiesData } from '../../firebase/firebase.utils.js'

const initialState = {
  isLoading: false,
  puppies: [],
  error: '',
}

export const getPuppiesFb = createAsyncThunk(
  'puppies/getPuppiesFb',
  async (_, thunkAPI) => {
    try {
      const puppies = await getPuppiesData()
      return puppies
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  },
)

export const puppiesSlice = createSlice({
  name: 'puppies',
  initialState,
  extraReducers: {
    [getPuppiesFb.pending]: (state) => {
      state.isLoading = true
    },
    [getPuppiesFb.fulfilled]: (state, action) => {
      state.isLoading = false
      state.puppies = action.payload
      state.error = ''
    },
    [getPuppiesFb.rejected]: (state, action) => {
      state.isLoading = false
      state.puppies = []
      state.error = action.payload
    },
  },
})

export default puppiesSlice.reducer
