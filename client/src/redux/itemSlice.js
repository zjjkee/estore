import { createSlice } from '@reduxjs/toolkit'

export const itemSlice = createSlice({ //！！！相当于创建store，actions + reducers
  name: 'item',
  initialState: {
    value: []
  },
  reducers: {
 
    updataitems:(state,action) =>{
      state.value = action.payload;
      return
    }

  }
})
// Action creators are generated for each case reducer function
export const { updataitems } = itemSlice.actions


export function checkout_show(items){
  let subtotal = 0
  let taxrate = 0.112
  for(let i of items){
    subtotal+=i.product.price*i.Qt
  }
  let tax = Number((subtotal*taxrate).toFixed(2))
  let total = Number((subtotal+tax).toFixed(2))
  subtotal = Number(subtotal.toFixed(2))
  taxrate = (Math.round(taxrate*10000))/100+'%'
  return {'taxrate':taxrate,'tax':tax,'subtotal':subtotal,'total':total}
}


export default itemSlice.reducer