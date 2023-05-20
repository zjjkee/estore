import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { checkout_show } from '../redux/itemSlice';
import Paypal from "../components/Paypal";



export default function Review(props) {

  const items = useSelector(state => state.item.value);

  if(props.addressinfo){
    var {firstname,lastname,address1,phone,city,state,zip,counrty}=props.addressinfo
    var address_ = [address1,city,state,zip,counrty];
  }

  console.log('items!:',items,'address:!',props.addressinfo)
  return (
    <>
    <Modal show={props.showreview} onHide={()=>{props.setShowreview(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>

    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.title} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.title} secondary={'x'+item.Qt} />
            <Typography variant="body2">${item.price}</Typography>
          </ListItem>
        ))}
          <ListItem key={'tax'} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={'Tax'}/>
            <Typography variant="body2">${checkout_show(items).tax}</Typography>
          </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${checkout_show(items).total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {props.addressinfo?(
            <>
              <Typography gutterBottom>{firstname} {lastname}</Typography>
              <Typography gutterBottom>{phone}</Typography>
              <Typography gutterBottom>{address_.join(', ')}</Typography>
            </>
          ):null}
          
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Method
          </Typography>
          <Grid container>

  <Paypal setShowreview={props.setShowreview} addressinfo={props.addressinfo}/>

          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>

     </Modal.Body>
           <Modal.Footer>
              <Button variant="dark" onClick={()=>{props.setShowaddress(true);props.setShowreview(false)}} >
              BACK
            </Button>
             {/* <Button variant="primary" type='submit' onClick={()=>{props.setShowreview(false)}}>
               PLACE ORDER
             </Button> */}
         </Modal.Footer>
       </Modal>
       </>
  );
}