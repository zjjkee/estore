import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({ //！！！相当于创建store，actions + reducers
  name: 'products',
  initialState: {
    value: []
  },
  reducers: {
    setproducts: (state,action) => {
        state.value = [...action.payload];
    },

  }
})

// Action creators are generated for each case reducer function
export const { setproducts} = productsSlice.actions


export default productsSlice.reducer