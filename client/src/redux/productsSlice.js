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
    timedescending: state => {
      state.value =  state.value.sort((a,b)=>{ 
        let a_ = new Date(a.date);
        let b_ = new Date(b.date);
        return b_-a_;
      });
    },
    timeascending: state => {
      state.value =  state.value.sort((a,b)=>{ 
        let a_ = new Date(a.date);
        let b_ = new Date(b.date);
        return a_-b_;
      });
    },
    pricedescending: state => {
      state.value = state.value.sort((a,b)=>{ return b.price-a.price});

    },
    priceascending: state => {
      state.value = state.value.sort((a,b)=>{ return a.price-b.price});

    }
    

  }
})

// Action creators are generated for each case reducer function
export const { setproducts, timeascending,timedescending,priceascending,pricedescending} = productsSlice.actions


export default productsSlice.reducer