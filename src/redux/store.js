import { configureStore } from '@reduxjs/toolkit'
import puppiesReducer from '../redux/slices/puppiesSlice'
import pricingReducer from '../redux/slices/pricingSlice'

export const store = configureStore({
  reducer: {
    puppies: puppiesReducer,
    pricing: pricingReducer,
  },
})
