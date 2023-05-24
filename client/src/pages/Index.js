import React from 'react'
import Button from 'react-bootstrap/Button';

export const Index = () => {

  const data = [
    "/background1.jpg",
    "/background2.jpg",
    "/background3.jpg",
    "/background4.jpg"
  ]


  return (
    <>
      <div style={{minHeight:'100%'}}>
        <div className='imagecontainer' style={{pistion:'relative'}}>
          <img className='image1 img' src={data[0]} alt=''/>
          <img className='image4 img' src={data[3]} alt=''/>
          
          <div className='phone'> 
            <img className='image2 img' src={data[1]} alt=''/>
            <img className='image3 img' src={data[2]} alt=''/>
          </div>
          <div  id='button' classname='btcontainer'  >
            <Button  className='shopping' variant="warning">
                <a href="/shopping"  className='aaa'> Go Shopping</a>
            </Button>
          </div>

        </div>

      </div>      
    </>
    
  )
}
