// make this template for later use
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { postAddress } from './store/address';

class CheckoutForm extends Component{

    constructor(props){
        super(props)
        this.state = {...this.userAddress(), ...this.userAddress(), ...this.userCreditCardInfo(), sameShippAddress: true}
    }

    // componentDidUpdate(prevProps){

    // }

    userAddress = (address) => (
        {
            firstName: address ? address.firstName : '',
            lastName: address ? address.lastName : '',
            addressLine1: address ? address.addressLine1 : '',
            addressLine2: address ? address.addressLine2 : '',
            zipCode: address ? address.zipCode : '',
            city: address ? address.city : '',
            state: address ? address.state : '',
        }
    )

    userCreditCardInfo = (creditCard) => (
        {
            firstNameOnCard: creditCard ? creditCard.firstNameOnCard : '',
            lastNameOnCard: creditCard ? creditCard.lastNameOnCard : '',
            cardNum: creditCard ? creditCard.cardNum : '',
            expMonth: creditCard ? creditCard.expMonth : '',
            expYear: creditCard ? creditCard.expYear : '',
            cvv: creditCard ? creditCard.cvv : '',
        }
    )

    onSave = (addType, ev) => {
        ev.preventDefault()
        const address = this.state
        const userId = this.props.user.id
        if (addType === 'Shipping Address') {
            address.addressType = 'shipping'
        } else {
            address.addressType = 'billing'
        }
        const type = address.addressType;
        console.log("here", address, userId, type)
        this.props.postAddress(address, userId, type)
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
        const {firstName, lastName, addressLine1, addressLine2, zipCode, city, sameShippAddress, firstNameOnCard, lastNameOnCard, cardNum, expMonth, expYear, cvv} = this.state
        const form = (addressType) => (
            <form onSubmit={(e) => onSave(addressType, e)}>
                    <label htmlFor="firstName">FirstName</label>
                    <input type="text" name="firstName" value={firstName} placeholder="John M. Eric" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="lastName">LastName</label>
                    <input type="text" name="lastName" value={lastName} placeholder="john@example.com" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="addressLine1">address Line1</label>
                    <input type="text" name="addressLine1" value = {addressLine1} placeholder="120 W 45th NYC" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="addressLine2">address Line2 Optional</label>
                    <input type="text" name="addressLine2" value = {addressLine2} placeholder="120 W 45th NYC" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="text" name="zipCode" value = {zipCode} placeholder="21003" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value = {city} placeholder="120 W 45th NYC" onChange = {onChange}/>
                    <br/>
                    <button type='submit'>{`Save ${addressType}`}</button>
            </form>
        )
        return(
            <div>
                <h3>Shipping Address</h3>
                    {form('Shipping Address')}
                <label>Is the billing address same as shipping address?</label>
                <input name='sameShippAddress' type='checkbox' checked={sameShippAddress} onChange={onChange}/>
                {
                    !sameShippAddress ? 
                    <div>
                        <h3>Billing Address</h3>
                        {form('Billing Address')}
                    </div> : null
                }
                <h3>Payment</h3>
                <span>Accepted Cards</span>
                <br/>
                <span> Visa, Master, Amex, Discover</span>
                <form onSubmit={onSave}>
                    <label htmlFor="firstNameOnCard">First Name on the Card</label>
                    <input type="text" name="firstNameOnCard" placeholder="John Eric" value={firstNameOnCard} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="lastNameOnCard">First Name on the Card</label>
                    <input type="text" name="lastNameOnCard" placeholder="John Eric" value={lastNameOnCard} onChange = {onChange}/>
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

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postAddress: (dataForm, userId, type) => dispatch(postAddress(dataForm, userId, type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
