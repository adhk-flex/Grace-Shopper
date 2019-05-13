import React from 'react';

const CheckoutChoice = (props) => {
  return (
    <div>
      <button onClick={() => props.history.push('/checkoutStep1')}>Checkout As Guest!</button>
      <button onClick={() => props.history.push('/login')}>Checkout As Return User!</button>
      <button onClick={() => props.history.push('/signup')}>Signup and Checkout!</button>
    </div>
  )
}

export default CheckoutChoice;
