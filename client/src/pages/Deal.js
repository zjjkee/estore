import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';



export default function Deal() {
  const location = useLocation();
  const { state } = location;
  // console.log('location:',location, 'state:',state);



  const[show,setShow] = useState(state.showtip); 

  function handleClose(){
    setShow(false)
  }



  return (<>

    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Payment Successfully!</p>
        </Modal.Body>
      </Modal>
    </>

     <section className="h-100 h-custom" style={{ backgroundColor: "#eee",minHeight:"100vh"}}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#CAE5BC" }}>
                    My Order
                  </p>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{state.update_time}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>{state.id}</p>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Details</p>
                      <p>{state.address.firstname} {state.address.lastname}</p>
                      <p>{state.address.phone}</p>
                      <p>{state.address.address1+', '}{state.address.city+', '}{state.address.state+', '}
                      {state.address.zip+', '}{state.address.country}
                        </p>
                    </MDBCol>
                  </MDBRow>


                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    {state.items.map(item=>{
                      return <MDBRow>
                      <MDBCol md="8" lg="9">
                        <p>{item.title} </p>
                        <p>x {item.Qt}</p>
                      </MDBCol>
                      <MDBCol md="4" lg="3">
                        <p>${item.price}</p>
                      </MDBCol>
                    </MDBRow>
                    })}


                    <MDBRow>
                      <MDBCol md="8" lg="9">
                        <p className="mb-0">Tax</p>
                      </MDBCol>
                      <MDBCol md="4" lg="3">
                        <p className="mb-0"> ${(11.2/100*Number(state.amount)).toFixed(2)}</p>
                      </MDBCol>
                    </MDBRow>
                  </div>

                  <MDBRow className="my-4">
                    <MDBCol md="4"  className="offset-md-8 col-lg-3 offset-lg-9">
                      <p className="lead fw-bold mb-0">
                       Total
                      </p>
                    </MDBCol>
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p className="lead fw-bold mb-0">
                       ${state.amount}
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#CAE5BC" }}
                  >
                    Tracking Order
                  </p>

                  <MDBRow>
                    <MDBCol lg="12">
                      <div className="horizontal-timeline">
                        <ul className="list-inline items d-flex justify-content-between">
                          <li className="list-inline-item items-list" >
                            <p
                              className="py-1 px-2 rounded text-white"
                              style={{ backgroundColor: " orange" }}
                            >
                              Ordered
                            </p>
                          </li>
                          <li className="list-inline-item items-list">
                            <p
                              className="py-1 px-2 rounded text-white"
                              style={{ backgroundColor: "#CAE5BC" }}
                            >
                              Shipped
                            </p>
                          </li>

                          <li
                            className="list-inline-item items-list text-end"
                          >
                            <p
                              className="py-1 px-2 rounded text-white"
                              style={{ backgroundColor: "#CAE5BC" }}
                            >    Delivered</p>
                          </li>
                        </ul>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <p className="mt-4 pt-2 mb-0">
                    Want any help?{" "}
                    <a href="" style={{ color: "#CAE5BC" }}>
                      Please contact us
                    </a>
                  </p>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  )}
