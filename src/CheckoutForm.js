// make this template for later use
import React, {Component} from 'react';

class CheckoutForm extends Component{
    render(){
        return(
            <div>
                <h3>Billing Address</h3>
                <form>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name="fullName" placeholder="John M. Eric"/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="john@example.com"/>
                    <br/>
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" placeholder="120 W 45th NYC"/>
                    <br/>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="text" name="zipCode" placeholder="21003"/>
                </form>
                <h3>Payment</h3>
                <span>Accepted Cards</span>
                <br/>
                <span> Visa, Master, Amex, Discover</span>
                <form>
                    <label htmlFor="nameCard">Name on the Card</label>
                    <input type="text" name="nameCard" placeholder="John Eric"/>
                    <br/>
                    <label htmlFor="cardNum">Credit Card Number</label>
                    <input type="text" name="cardNum" placeholder="1111-2222-3333-4444"/>
                    <br/>
                    <label htmlFor="expMonth">Exp Month</label>
                    <input type="text" name="expMonth" placeholder="August"/>
                    <br/>
                    <label htmlFor="expYear">Exp Year</label>
                    <input type="text" name="expYear" placeholder="2020"/>
                    <br/>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" name="cvv" placeholder="345"/>
                    <br/>
                </form>
                <button onClick={()=>{console.log('proceed to checkout')}}>Proceed To Checkout</button>
            </div>
            
        )
    }
}

export default CheckoutForm