import React from 'react';

const CheckoutChoice = (props) => {
  return (
    <div>
      <button className='btn btn-primary' onClick={() => props.history.push('/checkoutStep1')}>Checkout As Guest!</button>
      <button className='btn btn-primary' onClick={() => props.history.push('/login')}>Checkout As Return User!</button>
      <button className='btn btn-primary' onClick={() => props.history.push('/signup')}>Signup and Checkout!</button>
    </div>
  )
}

export default CheckoutChoice;
