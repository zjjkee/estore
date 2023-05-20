import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import itemRuducer from './itemSlice'
import productsSlice from './productsSlice'
import renderSlice from './renderSlice'
export default configureStore({
  reducer: {
    page: pageReducer,
    item: itemRuducer,
    products: productsSlice,
    render: renderSlice
  }
})