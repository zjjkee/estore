import * as React from 'react';
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function AddressForm(props) {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [address1,setAddress1] = useState('');
  const [phone,setPhone] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [zip,setZip] = useState('');  
  const [country,setCountry] = useState('');

  const [click,setClick] = useState(false)

  useEffect(()=>{
    props.setAddressinfo({
      'firstname':firstName,
      'lastname':lastName,
      'address1':address1,
      'phone':phone,
      'city':city,
      'state':state,
      'zip':zip,
      'country':country
     })
  },[firstName,lastName,address1,phone,city,state,zip,country])



  return (
    <>
    <Modal show={props.showaddress} onHide={()=>{props.setShowaddress(false)}}>
    {/* <form action='/review' onSubmit={false}> */}
      <Modal.Header closeButton>
        <Modal.Title>Address Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={e=>setFirstName(e.target.value)}
            value={firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={e=>setLastName(e.target.value)}
            value={lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={e=>setAddress1(e.target.value)}
            value={address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={e=>setPhone(e.target.value)}
            value={phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={e=>setCity(e.target.value)}
            value={city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={e=>setState(e.target.value)}
            value={state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={e=>setZip(e.target.value)}
            value={zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={e=>setCountry(e.target.value)}
            value={country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" onClick={()=>{setClick(true)}}/>}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="primary" disabled={!(firstName&&lastName&&address1&&city&&state&&zip&&country&&click)} onClick={()=>{props.setShowaddress(false);props.setShowreview(true);console.log('address:',props.addressinfo)}} >
           Next
         </Button>
     </Modal.Footer>
     {/* </form> */}
     
   </Modal>
     </>

  );
}