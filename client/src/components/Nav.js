import React, { useEffect,useState } from "react";
import { Link,} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { setrender } from "../redux/renderSlice";
import AuthService from "../services/auth_service";
import CartService from "../services/cart_service";
import { updataitems } from "../redux/itemSlice";


const Nav = (props) => {
  let { currentUser, setCurrentUser } = props;
  const dispatch = useDispatch();
  const render = useSelector(state=>state.render.value);
  const items = useSelector(state=>state.item.value);

  let sum = 0;
  for(let i of items){
    sum+=i.Qt;
  }
  const Dot = () =>{
    return items[0]&&<div className="dot">{sum}</div>
  }
  const handleSignout = () => {
    AuthService.signout();
    window.alert("Logout Successfully");
    setCurrentUser(null);
    // navigate("/signin");
  };

  

  useEffect(()=>{
    async function getdata(){
    try{
    let res = await CartService.get();
    dispatch(updataitems(res.data));
    } catch(err){
      alert(err.resonse.data)
    }
  }
    getdata();
  },[render])
  

  return (

    
    <nav>
      <h3>JINGKE's STORE</h3>

      <ul>
        <li>
          <Link to="/shopping"><span className="text">Shopping</span><span className="logo"><img className="logo" src="/shopping.png" alt="" /></span> </Link>
        </li>

        {currentUser?(currentUser.user.role==='buyer'?(
          <>
          <li>
            <Link to="/mycart"> 
              <span className="text">Mycart</span>
              <span className="logo"><img src="/mycart.png" alt="" />
            <Dot />
              </span>
            </Link>
          </li>     
          </>
        ):(
          <>
          <li>
            <Link to="/myproduct"> 
              <span className="text">MyProduct</span>
              <img className="logo" src="/myproduct.png" alt="" />
            </Link>
          </li>
          <li>
            <Link to="/post"> 
              <span className="text">Post</span>
              <img className="logo" src="/post.png" alt="" />
            </Link>
          </li>
          
          </>
          )
        ):null}

        {currentUser&&
          <li>
            <NavDropdown  title={<span className="text">More</span>} id="navbarScrollingDropdown">
              <NavDropdown.Item  href="/profile">
                <span className="text">Profile</span><img className="logo" src="/profile.png" alt="" />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {currentUser.user.role==='buyer'?
                <NavDropdown.Item  href="/purchase">
                  <span className="text">Purchase</span><img className="logo" src="/profile.png" alt="" />
                </NavDropdown.Item>
                :
                <NavDropdown.Item  href="/transaction">
                  <span className="text">Transaction</span><img className="logo" src="/profile.png" alt="" />
                </NavDropdown.Item>               
                }
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignout} href="/shopping">
                <span className="text">Signout</span><img className="logo" src="/logout.png" alt="" />
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        }

        {!currentUser&&<li>
          <Link to="/signin"><span className="text">SignIn</span><img className="logo" src="/login.png" alt="" /> </Link>
        </li>}

        {!currentUser&&<li>
          <Link to="/signup"><span className="text">SignUp</span><img className="logo" src="/register.png" alt="" /> </Link>
        </li>}

      </ul>
    </nav>
  );
};

export default Nav;
