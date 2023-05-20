import React,{useState} from "react";
import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Mycart from "./pages/Mycart";
import Nav from "./components/Nav";
import Post from "./pages/Post";
import Myproduct from "./pages/Myproduct";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import Purchase from "./pages/Purchase"

import Deal from "./pages/Deal";
import { Index } from "./pages/Index";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";

import AuthService from "./services/auth_service"

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./styles/style.css";




function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());


  return (
    <div className="App">
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
          {/* general */}
          <Route path="/" element={<Index currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={
            <SignIn currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/shopping" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          {/* For Buyer */}
          <Route path="/mycart" element={<Mycart currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/myproduct" element={<Myproduct currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/purchase" element={<Purchase currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/deal" element={<Deal currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>

          {/* For seller */}
          <Route path="/post" element={<Post currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/myproduct" element={<Myproduct currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/transaction" element={<Transaction currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>

      </Routes>
    </div>
  );
}

export default App;
