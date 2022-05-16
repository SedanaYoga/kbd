import { configureStore } from '@reduxjs/toolkit'
import puppiesReducer from '../redux/slices/puppiesSlice'

export const store = configureStore({
  reducer: {
    puppies: puppiesReducer,
  },
})
