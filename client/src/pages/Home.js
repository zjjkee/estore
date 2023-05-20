import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Pagebutton from "../components/Pagebutton";
import { useSelector, useDispatch } from 'react-redux';
import { setproducts } from "../redux/productsSlice";
import ProductService from '../services/product_service';

export default function Home(props) {
    const page = useSelector(state => state.page.value)
    const products = useSelector(state => state.products.value)

    const [data, setData] = useState(null);
    const dispatch = useDispatch();

      useEffect(() => {
        async function getData() {
            try{
            let rawdata = await ProductService.allproduct();
            let alldata = rawdata.data
            // console.log('alldata',alldata)
            dispatch(setproducts(alldata))            
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
        // console.log('products',products)
      },[page,products])


    return (
    <div style={{ minHeight: "100vh"}}>  
        <img className='image'  src={"https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg"} alt=''/>
        <div className="text">
            <div className="text_">
                <h4 >Our Product</h4>
            </div>
        </div>
        
        <div className="products" >
            {data &&
            data.map((d) => {
                return <Product data={d} currentUser={props.currentUser}/>;
            })}
        </div>
        <Pagebutton/>
    </div>
)}
