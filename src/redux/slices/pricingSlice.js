import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPricing } from '../../firebase/firebase.utils.js'

const initialState = {
  isLoading: false,
  pricing: [],
  error: '',
}

export const getPricingFb = createAsyncThunk(
  'puppies/getPricingFb',
  async (_, thunkAPI) => {
    try {
      const pricing = await getPricing()
      return pricing
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  },
)

export const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  extraReducers: {
    [getPricingFb.pending]: (state) => {
      state.isLoading = true
    },
    [getPricingFb.fulfilled]: (state, action) => {
      state.isLoading = false
      state.pricing = action.payload
      state.error = ''
    },
    [getPricingFb.rejected]: (state, action) => {
      state.isLoading = false
      state.pricing = []
      state.error = action.payload
    },
  },
})

export default pricingSlice.reducer
