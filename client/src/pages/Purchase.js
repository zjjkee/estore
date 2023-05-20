import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import OrderService from "../services/order_service";
import { useNavigate } from 'react-router-dom';

export default function Purchase() {
  const [orders,setOrders] = useState([]);
  let i=1;
  const navigate = useNavigate();



  useEffect(()=>{
    OrderService.getorder().then(res=>{
      setOrders(res.data);
      console.log('res.data',res.data);
      
    }).catch(e=>{
      alert(e.response.data);
    })
  },[])

  const handleClick = (e)=>{
    let id = e.target.parentElement.id;
    let renderorder = orders.find(d=>d.id===id); 
    console.log('renderorder',renderorder);
      navigate('/deal',{ state: {
        address: renderorder.address,
        id: renderorder.id,
        update_time: renderorder.date,
        items:renderorder.goods,
        amount:renderorder.amount,
        showtip:false,
        // status_: details.status  
        }  })
  }


  return (
    <>
       <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th colSpan={2}>Order_Id</th>
          <th>Date</th>
          <th>Purchase Amount</th>
        </tr>
      </thead>
      <tbody>
      {orders.map(order=>
      <tr onClick={handleClick}  id={order.id} style={{cursor:'pointer'}}>
        <td>{i++}</td>
        <td colSpan={2}>{order.id}</td>
        <td>{order.date}</td>
        <td>{order.amount}</td>
      </tr>
        )}
      </tbody>
    </Table>

      

    </>
  )
}
