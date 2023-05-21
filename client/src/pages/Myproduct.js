import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import ProductService from '../services/product_service'


export default function Myproduct({currentUser}) {
    const [myproducts,setMyproducts] = useState([])
    const [deleteshow,setDeleteshow] = useState(false)
 
    function emptyornull(arr){
        if(arr==null){
            return true
        } else if(!arr[0]){
        return true
        }else{
            return false
        }
    }

    useEffect(() => {
        setDeleteshow(true)
        async function getData() {
            try{
            let rawdata = await ProductService.myproduct();
            let alldata = rawdata.data
            setMyproducts(alldata)
            }catch(err){
                // alert(err)
                console.log(err)
            }
        }
        getData();
    },[deleteshow])
    
    console.log('myproducts',myproducts)
    console.log('emptyornull',emptyornull(myproducts));
    


    if(currentUser){
    return (
        <>            
            <div className="text">
                <div className="text_">
                    <h4 >My Products On Sell</h4>
                </div>
            </div>

            {emptyornull(myproducts)?
            <div className="empty" style={{minHeight:"100vh" }}>
                <div className="blank"></div>
                <h1 >You Have NOt Post Any Product!</h1>
                <a href="/post">Go Post!</a>
                <div className="blank"></div>
            </div>:
            <div className="products" >
            {myproducts.map((d) => {
                return <Product data={d} currentUser={currentUser} deleteshow={deleteshow} setDeleteshow={setDeleteshow} />
            })}
            </div>
            }
        </>
    )
    }else{
        return (
        <div className="empty" style={{minHeight:"100vh" }}>
            <div className="blank"></div>
            <h1 >You Need To Signin!!</h1>
            <a href="/Signin">Signin here</a>
            <div className="blank"></div>
        </div>
    )}
}