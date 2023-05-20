import { createSlice } from '@reduxjs/toolkit'

export const renderSlice = createSlice({ //！！！相当于创建store，actions + reducers
  name: 'render',
  initialState: {
    value: 0
  },
  reducers: {
    setrender: (state) => {
        state.value +=1
        return
    },

  }
})

// Action creators are generated for each case reducer function
export const { setrender} = renderSlice.actions


export default renderSlice.reducer