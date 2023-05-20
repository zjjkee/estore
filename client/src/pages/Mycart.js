import React,{useState}  from "react";
import AddressForm from "../Mycart_elements/Addressform";
import Review from "../Mycart_elements/Review";
import Myitems from "../Mycart_elements/Myitems";
import { useSelector } from "react-redux";

export default function SummaryPage(props) {
  const [showaddress, setShowaddress] = useState(false);
  const [showreview, setShowreview] = useState(false);
  const [addressinfo,setAddressinfo] = useState({});

  let items = useSelector(state=>state.item.value)

  if(!props.currentUser){
     return<div>You Need To Sign In First1</div>

    }else{
      if(items[0]){
        return (
          <section className="h-100 h-custom" style={{ minHeight: "100vh"}} >
            <Myitems setShowaddress={setShowaddress} items={items}/>
            
            <AddressForm showaddress={showaddress} setShowaddress={setShowaddress} setShowreview={setShowreview} setAddressinfo={setAddressinfo} addressinfo={addressinfo}/>
      
            <Review setShowaddress={setShowaddress} showreview={showreview} setShowreview={setShowreview} addressinfo={addressinfo} />
      
          </section>
        );
      }else{
          return <div className="empty" style={{minHeight:"100vh" }}>
          <div className="blank"></div>
          <h1 >Your Cart is Empty!</h1>
          <a href="/">Let's Go Shopping!</a>
          <div className="blank"></div>
          </div>
      }

    }
  }
 