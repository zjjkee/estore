import { createSlice } from '@reduxjs/toolkit';


export const pageSlice = createSlice({ //！！！相当于创建store，actions + reducers
  name: 'page',
  initialState: {
    value: 1
  },
  reducers: {
    nextpage: (state,action) => {
        if(state.value< Math.ceil(action.payload.length/8)){
            state.value += 1
        }else{
            return
        }
        
    },
    previouspage: state => {
        if(state.value>1){
            state.value -= 1
        }else{
            return
        }
        
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { nextpage,previouspage } = pageSlice.actions


export default pageSlice.reducer