import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import Product from "../components/Product";
import Pagebutton from "../components/Pagebutton";
import { useSelector, useDispatch } from 'react-redux';
import { setproducts,timeascending,timedescending,priceascending,pricedescending } from "../redux/productsSlice";
import ProductService from '../services/product_service';




export default function Home(props) {
    const page = useSelector(state => state.page.value)
    const products = useSelector(state => state.products.value)


    const [data, setData] = useState(null);
    const [showpage, setShowpage] = useState(false);

    const dispatch = useDispatch();

    function handleClickTimeUp(){
        dispatch(timeascending())
    }

    function handleClickTimeDown(){
        dispatch(timedescending())
    }

    function handleClickPriceUp(){
        dispatch(priceascending())
    }

    function handleClickPricedown(){
        dispatch(pricedescending())
    }

    
      useEffect(() => {
        async function getData() {
            try{
            let rawdata = await ProductService.allproduct();
            let alldata = rawdata.data
            // console.log('alldata',alldata)
            dispatch(setproducts(alldata))
            setShowpage(true);            
            }catch(err){
                // alert(err)
                console.log(err)
            }
        }
        getData();
      }, []);
  
      useEffect(() => {
        let showdata = [];
        for(let i=8*(page-1);i<8*page;i++){
            if(products[i]!==undefined){
            showdata.push(products[i])
            }
        }
        setData(showdata)
        console.log('products',products)
      },[page,products])


    return (
      <div style={{ minHeight: "100vh" }}>
        <img
          className="image"
          src={
            "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg"
          }
          alt=""
        />
        <div className="text">
          <div className="text_">
            <h4>All Products</h4>
          </div>
        </div>
        <Container className="mt-5">
          <Row style={{ justifyContent: "flex-end" }}>
            <Col sm={3}>
              <div className="sort">

              <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">Time Descending</Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <Button
                      className="timedown"
                      variant="light"
                      onClick={handleClickTimeDown}
                      {...triggerHandler}
                    >
                      <img
                        ref={ref}
                        className="sort"
                        src="/timedown.png"
                        alt=""
                      />
                    </Button>
                  )}
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">Price Ascending</Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                <Button
                className="moneyup"
                variant="light"
                onClick={handleClickPriceUp}
                {...triggerHandler}
              >
                <img ref={ref} className="sort" src="/moneyup.png" alt="" />
              </Button>
                  )}
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">Price Descending</Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                <Button
                className="moneyup"
                variant="light"
                onClick={handleClickPricedown}
                {...triggerHandler}
              >
                <img ref={ref} className="sort" src="/moneydown.png" alt="" />
              </Button>
                  )}
                </OverlayTrigger>


              </div>
            </Col>

            {/* <Col sm={5}>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search Via Name"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button  variant="warning" >
                    Search
                    </Button>{' '}
                </Form>
                </Col> */}
          </Row>
        </Container>

        <div className="products">
          {data &&
            data.map((d) => {
              return <Product data={d} currentUser={props.currentUser} />;
            })}
        </div>
        {showpage && <Pagebutton />}
      </div>
    );}

