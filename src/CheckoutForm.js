// make this template for later use
import React, {Component} from 'react';

class CheckoutForm extends Component{

    constructor(){
        super()
        this.state = {
            fullName: '',
            email: '',
            address: '',
            zipCode: '',
            sameShippAddress: true,
            cardName: '',
            cardNum: '',
            expMonth: '',
            expYear: '',
            cvv: '',
            errors: []
        }
    }

    // componentDidUpdate(prevProps){

    // }

    onSave = (ev) => {
        ev.preventDefault()
    }

    onChange = (ev) => {
        // this.setState({[ev.target.name]:ev.target.value})
        const target = ev.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    render(){
        const {onSave, onChange} =  this
        const {fullName, email, address, zipCode, sameShippAddress, cardName, cardNum, expMonth, expYear, cvv} = this.state
        const form = (addressType) => (
            <form onSubmit={onSave}>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name="fullName" value={fullName} placeholder="John M. Eric" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} placeholder="john@example.com" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value = {address} placeholder="120 W 45th NYC" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="text" name="zipCode" value = {zipCode} placeholder="21003" onChange = {onChange}/>
                    <br/>
                    <button type='submit'>{`Save ${addressType}`}</button>
            </form>
        )
        return(
            <div>
                <h3>Billing Address</h3>
                    {form('Billing Address')}
                <label>Is the shipping address same as billing address?</label>
                <input name='sameShippAddress' type='checkbox' checked={sameShippAddress} onChange={onChange}/>
                {
                    !sameShippAddress ? 
                    <div>
                        <h3>Shipping Address</h3>
                        {form('Shipping Address')}
                    </div> : null
                }
                <h3>Payment</h3>
                <span>Accepted Cards</span>
                <br/>
                <span> Visa, Master, Amex, Discover</span>
                <form onSubmit={onSave}>
                    <label htmlFor="cardName">Name on the Card</label>
                    <input type="text" name="cardName" placeholder="John Eric" value={cardName} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="cardNum">Credit Card Number</label>
                    <input type="text" name="cardNum" placeholder="1111-2222-3333-4444" value={cardNum} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="expMonth">Exp Month</label>
                    <input type="text" name="expMonth" placeholder="August" value={expMonth} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="expYear">Exp Year</label>
                    <input type="text" name="expYear" placeholder="2020" value={expYear} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" name="cvv" placeholder="345" value={cvv} onChange = {onChange}/>
                    <br/>
                    <button type='submit'>Save</button>
                </form>
                <button onClick={()=>{console.log('proceed to checkout page')}}>Proceed To Checkout</button>
            </div>
            
        )
    }
}

export default CheckoutForm