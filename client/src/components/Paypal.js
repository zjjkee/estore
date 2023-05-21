import React,{useEffect, useState} from "react";
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { useDispatch, useSelector} from "react-redux";
import { checkout_show } from "../redux/itemSlice";
import CartService from "../services/cart_service.js";
import OrderService from "../services/order_service";
import { useNavigate } from 'react-router-dom';
import { setrender } from "../redux/renderSlice";


export default function Paypal(props) {
  const dispatch = useDispatch();

    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    
    const navigate = useNavigate();

    const items = useSelector(state=>state.item.value);


    let goods = items.map(item=>{return {
      product:item.product._id,
      title:item.product.title,
      price:item.product.price,
      Qt:item.Qt,
      seller:item.product.seller}});
    console.log('goods',goods)

    // creates a paypal order
    const createOrder = (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              description: "Sunflower",
              amount: {
                currency_code: "USD",
                value: checkout_show(items).total,
              },
            },
          ],
          // not needed if a shipping address is actually needed
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        })
        .then((orderID) => {
          setOrderID(orderID);
          return orderID;
        });
    };
    
    // check Approval
    const onApprove = (data, actions) => {
      return actions.order.capture().then((details) => {
        console.log('details',details);
        (async function(){
          await OrderService.onpapprove_save(details.id,checkout_show(items).total, goods ,props.addressinfo)
          await CartService.removeAll();
          dispatch(setrender());
            navigate('/deal',{ state: {
              address: props.addressinfo,
              id: details.id,
              update_time: details.update_time,
              items:goods,
              amount:details.purchase_units[0].amount.value,
              showtip:true
            } })
        }())
        
      });
    };
    //capture likely error
    const onError = (data, actions) => {
      setErrorMessage("An Error occured with your payment ");
    };

    const initialOptions = {
      "client-id": "AZMKsDktJ_LYOn5VHzLarlCmcPIlRcjivJ19XJ_SpXl19B-_Bqp1DsbYyMIrlE6yC8BXQFoCfH3UNHwX",
  };

    return (
        <PayPalScriptProvider
        options={initialOptions}
      >
         
            <PayPalButtons
              className="paypalbutton"
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              />
            
   
      </PayPalScriptProvider>

      // <PayPalScriptProvider
      //       options={{
      //           "client-id": "AZMKsDktJ_LYOn5VHzLarlCmcPIlRcjivJ19XJ_SpXl19B-_Bqp1DsbYyMIrlE6yC8BXQFoCfH3UNHwX",
      //       }}
      //   >
      //       <BraintreePayPalButtons
      //           createOrder={(data, actions) => {
      //               return actions.braintree.createPayment({
      //                   flow: "checkout",
      //                   amount: "10.0",
      //                   currency: "USD",
      //                   intent: "capture",
      //               });
      //           }}
      //           onApprove={(data, actions) => {
      //               return actions.braintree
      //                   .tokenizePayment(data)
      //                   .then((payload) => {
      //                       // call server-side endpoint to finish the sale
      //                   });
      //           }}
      //       />
      //   </PayPalScriptProvider>
    );
}