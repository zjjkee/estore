import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import OrderService from "../services/order_service";
import Modal from 'react-bootstrap/Modal';
import {
  MDBCol,
  MDBRow
} from "mdb-react-ui-kit";



export default function Transaction() {
  const [orders,setOrders] = useState([]);
  const [sellerorders,setSellerorders] = useState([]);
  const [show,setShow] = useState(false);
  const [selectorder,setSelectorder] = useState({});

  const seller_id = JSON.parse(localStorage.getItem("user")).user._id;
  let i =1;  

  useEffect(()=>{
    OrderService.getAllOrder().then(res=>{      
      setOrders(res.data);      
    }).catch(e=>{
      alert(e.response.data);
    })
  },[])

  useEffect(()=>{
    setSellerorders( 
      orders.map(d=>{
        return {
            id:d.id,
            buyer:d.buyer,
            amount:d.amount,
            address:d.address,
            date:d.date,
            goods:d.goods.filter(i=>i.seller==seller_id)
        }
      })
    )
  },[orders])
  
  function compute_income(order){
    let sum = 0;
    for(let o of order.goods){
        sum+=o.price*o.Qt
    }
    return sum;
  }

  const handleClose = ()=>{
    setShow(false);
  }

  // const handleShow = ()=>{
  //   setShow(true);
  // }

  const handleClickSelect = (e)=>{
    
    console.log('e.target.id',e.target.parentNode.id);
    setSelectorder(sellerorders.find(d=>d.id===e.target.parentNode.id))
    setShow(true);
  }

  console.log('selectorder',selectorder);
  





  return (
  <>

    {JSON.stringify(selectorder)!=='{}'&&
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBRow>
            <MDBCol className="mb-3">
            <p className="lead fw-bold mb-5 text-xl-start " >
            Order ID
            </p>
            </MDBCol>
            <MDBCol className="mb-3">
            <p className="lead fw-bold mb-8" style={{ color: "#CAE5BC" }}>
            {selectorder.id}
            </p>
            </MDBCol>
          </MDBRow>


          <MDBRow>
            <MDBCol className="mb-3">
              <p className="small text-muted mb-1">Buyer ID</p>
              <p>{selectorder.buyer}</p>
            </MDBCol>
            <MDBCol className="mb-3">
              <p className="small text-muted mb-1">Date</p>
              <p>{selectorder.date}</p>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol className="mb-3">
              <p className="small text-muted mb-1">Shipping Address</p>
              <p>{selectorder.address.firstname} {selectorder.address.lastname}</p>
              <p>{selectorder.address.phone}</p>
              <p>{selectorder.address.address1+', '}{selectorder.address.city+', '}{selectorder.address.state+', '}
              {selectorder.address.zip+', '}{selectorder.address.country}
                </p>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBRow>
            <p className="small text-muted mb-1">Products</p>
            </MDBRow>

              <div
                className="mx-n5 px-5 py-4"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                {selectorder.goods.map(item=>{
                  return <MDBRow>
                  <MDBCol md="8" lg="9">
                    <p>{item.title} </p>
                    <div>
                      <p>x {item.Qt}</p>
                    </div>
                  </MDBCol>
                  <MDBCol md="4" lg="3">
                    <p>${item.price}</p>
                  </MDBCol>
                </MDBRow>
                })}
              </div>

          </MDBRow>


          <MDBRow className="my-4">
            <MDBCol md="4"  className="offset-md-8 col-lg-3 offset-lg-9">
              <p className="lead fw-bold mb-0">
                Total Income
              </p>
            </MDBCol>
            <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
              <p className="lead fw-bold mb-0">
                ${compute_income(selectorder)}
              </p>
            </MDBCol>
          </MDBRow>


        </Modal.Body>
      </Modal>
    }
  

    <Table striped hover>
   <thead>
     <tr>
       <th>#</th>
       <th >Order_Id</th>
       <th >Buyer_Id</th>
       <th>Date</th>
       <th>Income</th>
     </tr>
   </thead>
   <tbody>
   {sellerorders.map(order=>
   <tr onClick={handleClickSelect}  id={order.id} style={{cursor:'pointer'}}>
     <td>{i++}</td>
     <td >{order.id}</td>
     <td >{order.buyer}</td>
     <td>{order.date}</td>
     <td>+${compute_income(order)}</td>
   </tr>
     )}
   </tbody>
 </Table>
 </>
  )
}
