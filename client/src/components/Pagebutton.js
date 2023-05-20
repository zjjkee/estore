import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nextpage,previouspage} from '../redux/pageSlice'

export default function Page() {
  const page = useSelector(state => state.page.value);
  const products = useSelector(state => state.products.value)
  const dispatch = useDispatch()

  return (
    <div className='arrows'>
        
        <button onClick={() => dispatch(previouspage())}>
            <img className="arrow" src="/left.svg" alt=""  />
        </button>
        <span>{page}</span>
        <button onClick={() => dispatch(nextpage(products))}>
            <img className="arrow" src="/right.svg" alt=""  />
        </button>
    </div>
  )
}