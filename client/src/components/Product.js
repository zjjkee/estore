import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import {  useDispatch} from 'react-redux';
import { setrender } from '../redux/renderSlice';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { encodeImage } from '../services/utils';
import { MDBIcon } from 'mdb-react-ui-kit';
import ProductService from '../services/product_service';
import CartService from "../services/cart_service";


const Product = ({ data ,currentUser, deleteshow, setDeleteshow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  function handleClose(){
    setShow(false)
  }
  function handleShow(){ 
    setShow(true);
  }
  async function Islogin(){
    if(localStorage.getItem("user")){
      let res = await CartService.addtocart(data._id);
      alert(res.data);
      dispatch(setrender());
    }else{
      alert("You Need To SignIn First!")
      navigate("/signin")
    }
  }

  async function deleteProduct(){
    try{
      let res = await ProductService.deleteproduct(data._id);
      alert(res.data);
      setDeleteshow(false);
    }catch(err){
      console.log('err',err);
      alert(err.response.data)
    }    
  }

  


  return (
  <>
    <Card  className="Product" key={data._id}>
      <Card className='imageContainer'><Card.Img variant="top" src={encodeImage(data.mimetype,data.buffer.data)} onClick={handleShow}/></Card>
      <Card.Body className='cardbody'>
        <Card.Title>
          {data.title} 
        </Card.Title>
        <Card.Text>
        Price: {data.price}$
        <br/>
        Seller:  {data.seller.username} <br />
        <a onClick={handleShow}>More details</a>
        </Card.Text>
        {currentUser? (currentUser.user.role!=="seller"?
        <Button className='cart' variant="primary" onClick={()=>{Islogin()}} >🛒</Button>:null
        ):<Button className='cart' variant="primary" onClick={()=>{Islogin()}} >🛒</Button>
        }
        {deleteshow?<Button variant='danger' onClick={deleteProduct}><MDBIcon fas icon="trash-alt" /></Button>:null
          
        }

        
       
      </Card.Body>
    </Card>

    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> <span style={{fontWeight:'bold'}}>Price:</span> {data.price}$</p>
          <p><span style={{fontWeight:'bold'}}>Category:</span> {data.category}</p>
          <p><span style={{fontWeight:'bold'}}>Seller:</span> {data.seller.username}</p>
          <p><span style={{fontWeight:'bold'}}>Contact:</span> {data.seller.email}</p>
          <p><span style={{fontWeight:'bold',fontSize:'1.3rem'}}>Description:</span> {data.description}</p>
        </Modal.Body>
        <Modal.Footer>
          {currentUser?(
         currentUser.user.role!=="seller"&&<Button variant="primary" onClick={()=>{Islogin()}}>ADD🛒</Button>
          ):<Button variant="primary" onClick={()=>{Islogin()}}>ADD🛒</Button>}
          
        </Modal.Footer>
      </Modal>
    </>
    </>
  );
};

export default Product;
