import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPuppiesFb } from '../redux/slices/puppiesSlice'
import { getPricingFb } from '../redux/slices/pricingSlice'

export default (puppies) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (puppies.length === 0) {
      dispatch(getPuppiesFb())
      dispatch(getPricingFb())
    }
  }, [])
}
