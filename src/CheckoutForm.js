// make this template for later use
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { postAddress } from './store/address';
import { postCreditCard } from './store/creditcards';

class CheckoutForm extends Component{

    constructor(props){
        super(props)
        this.state = {...this.userAddress(), ...this.userAddress(), ...this.userCreditCardInfo(), sameShippAddress: true}
    }

    userAddress = (address) => (
        {
            firstName: address ? address.firstName : '',
            lastName: address ? address.lastName : '',
            addressLine1: address ? address.addressLine1 : '',
            addressLine2: address ? address.addressLine2 : '',
            city: address ? address.city : '',
            state: address ? address.state : '',
            zip: address ? address.zip : '',
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
            cardType: creditCard ? creditCard.cardType : '',
        }
    )

    onSaveAddress = (addType, ev) => {
        ev.preventDefault()
        const address = {
            addressType: addType === 'Shipping Address' ? 'shipping' : 'billing',
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            addressLine1: this.state.addressLine1,
            addressLine2: this.state.addressLine2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        }
        const userId = this.props.user.id
        this.props.postAddress(address, userId, address.addressType)
        if (this.state.sameShippAddress) {
            this.props.postAddress({...address, addressType: 'billing'}, userId, 'billing')
        }
    }

    onSaveCC = (e) => {
        e.preventDefault()
        const creditCard = {
            firstName: this.state.firstNameOnCard,
            lastName: this.state.lastNameOnCard,
            cardType: this.state.cardType,
            number: this.state.cardNum,
            expMonth: this.state.expMonth,
            expYear: this.state.expYear,
            cvv: this.state.cvv,
        }
        const userId = this.props.user.id;
        console.log('credit Card', creditCard, "userId", userId)
        this.props.postCreditCard(userId, creditCard)
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
        // console.log(this.state)
        const {onSaveAddress, onSaveCC, onChange} =  this
        const {firstName, lastName, addressLine1, addressLine2, zip, city, state, sameShippAddress, firstNameOnCard, lastNameOnCard, cardNum, expMonth, expYear, cvv, cardType} = this.state
        const form = (addressType) => (
            <form onSubmit={(e) => onSaveAddress(addressType, e)}>
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
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" name="zip" value = {zip} placeholder="21003" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="state">State</label>
                    <input type="text" name="state" value = {state} placeholder="NY" onChange = {onChange}/>
                    <br/>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value = {city} placeholder="NYC" onChange = {onChange}/>
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
                <form onSubmit={onSaveCC}>
                    <label htmlFor="cardType">Accepted Cards: Visa, Master, Amex, Discover</label>
                    <input type="text" name="cardType" placeholder="visa" value={cardType} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="firstNameOnCard">First Name on the Card</label>
                    <input type="text" name="firstNameOnCard" placeholder="John Eric" value={firstNameOnCard} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="lastNameOnCard">Last Name on the Card</label>
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
        postCreditCard: (userId, cardInfo) => dispatch(postCreditCard(userId, cardInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
