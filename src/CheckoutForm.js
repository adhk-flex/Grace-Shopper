// make this template for later use
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { postAddress } from './store/address';
import { postCreditCard } from './store/creditcards';
import { createOrder } from './store/order';

class CheckoutForm extends Component{

    constructor(props){
        super(props)
        this.state = {...this.userShipAddress(), ...this.userBillAddress(), ...this.userCreditCardInfo(), sameShippAddress: true, errors: []}
    }

    userShipAddress = (address) => (
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

    userBillAddress = (address) => (
        {
            firstNameBill: address ? address.firstName : '',
            lastNameBill: address ? address.lastName : '',
            addressLine1Bill: address ? address.addressLine1 : '',
            addressLine2Bill: address ? address.addressLine2 : '',
            cityBill: address ? address.city : '',
            stateBill: address ? address.state : '',
            zipBill: address ? address.zip : '',
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
        let address = {}
        if(addType === 'Shipping Address'){
             address = {
                addressType: 'shipping',
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                addressLine1: this.state.addressLine1,
                addressLine2: this.state.addressLine2,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
            }
        }
        else{
            address = {
                addressType: 'billing',
                firstName: this.state.firstNameBill,
                lastName: this.state.lastNameBill,
                addressLine1: this.state.addressLine1Bill,
                addressLine2: this.state.addressLine2Bill,
                city: this.state.cityBill,
                state: this.state.stateBill,
                zip: this.state.zipBill,
            }
        }
        
        const userId = this.props.user.id
        this.props.postAddress(address, userId, address.addressType)
        if (this.state.sameShippAddress) {
            this.props.postAddress({...address, addressType: 'billing'}, userId, 'billing')
            .catch(ex=>this.setState({errors: ex.response.data.errors}))
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
        this.props.postCreditCard(userId, creditCard)
    }

    onChange = (ev) => {
        const target = ev.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    render(){
        const {onSaveAddress, onSaveCC, onChange} =  this;
        const {firstName, firstNameBill, lastName, lastNameBill, addressLine1, addressLine1Bill, addressLine2, addressLine2Bill, zip, zipBill, city, cityBill, state, stateBill, sameShippAddress, firstNameOnCard, lastNameOnCard, cardNum, expMonth, expYear, cvv, cardType, errors} = this.state;
        const creditCardTypeArr = ['cardType', 'visa', 'mastercard', 'amex', 'discover'];
        const expMonthArr = ['month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const form = (addressType) => (
            <form onSubmit={(e) => onSaveAddress(addressType, e)}>
                    <label htmlFor={`firstName${addressType === 'Billing Address' ? 'Bill' : ''}`}>FirstName</label>
                    <input type="text" name={`firstName${addressType === 'Billing Address' ? 'Bill' : ''}`} value={addressType === 'Billing Address' ? firstNameBill : firstName} placeholder="John M. Eric" onChange = {onChange}/>
                    <br/>
                    <label htmlFor={`lastName${addressType === 'Billing Address' ? 'Bill' : ''}`}>LastName</label>
                    <input type="text" name={`lastName${addressType === 'Billing Address' ? 'Bill' : ''}`} value={addressType === 'Billing Address' ? lastNameBill: lastName} placeholder="john@example.com" onChange = {onChange}/>
                    <br/>
                    <label htmlFor={`addressLine1${addressType === 'Billing Address' ? 'Bill' : ''}`}>address Line1</label>
                    <input type="text" name={`addressLine1${addressType === 'Billing Address' ? 'Bill' : ''}`} value = {addressType === 'Billing Address' ? addressLine1Bill: addressLine1} placeholder="120 W 45th NYC" onChange = {onChange}/>
                    <br/>
                    <label htmlFor={`addressLine2${addressType === 'Billing Address' ? 'Bill' : ''}`}>address Line2 Optional</label>
                    <input type="text" name={`addressLine2${addressType === 'Billing Address' ? 'Bill' : ''}`} value = {addressType === 'Billing Address' ? addressLine2Bill: addressLine2} placeholder="120 W 45th NYC" onChange = {onChange}/>
                    <br/>
                    <label htmlFor={`zip${addressType === 'Billing Address' ? 'Bill' : ''}`}>Zip Code</label>
                    <input type="text" name={`zip${addressType === 'Billing Address' ? 'Bill' : ''}`} value = {addressType === 'Billing Address' ? zipBill : zip} placeholder="21003" onChange = {onChange}/>
                    <br/>
                    <label htmlFor={`state${addressType === 'Billing Address' ? 'Bill' : ''}`}>State</label>
                    <input type="text" name={`state${addressType === 'Billing Address' ? 'Bill' : ''}`} value = {addressType === 'Billing Address' ? stateBill : state} placeholder="NY" onChange = {onChange}/>
                    <br/>
                    <label htmlFor={`city${addressType === 'Billing Address' ? 'Bill' : ''}`}>City</label>
                    <input type="text" name={`city${addressType === 'Billing Address' ? 'Bill' : ''}`} value = {addressType === 'Billing Address' ? cityBill : city} placeholder="NYC" onChange = {onChange}/>
                    <br/>
                    <button type='submit'>{`Save ${addressType}`}</button>
            </form>
        )
        return(
            <div>
                <h3>Shipping Address</h3>
                    {!!errors.length && (<ul>
                        {
                            errors.map((error,idx)=>(
                                <li key={idx}>{error}</li>
                            ))
                        }
                    </ul>)}
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
                    <select name="cardType" value={cardType} onChange = {onChange}>
                        {
                            creditCardTypeArr.map(card=>{
                                return (
                                    <option key={card} value={card}>{card}</option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor="firstNameOnCard">First Name on the Card</label>
                    <input type="text" name="firstNameOnCard" placeholder="John" value={firstNameOnCard} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="lastNameOnCard">Last Name on the Card</label>
                    <input type="text" name="lastNameOnCard" placeholder="Eric" value={lastNameOnCard} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="cardNum">Credit Card Number</label>
                    <input type="text" name="cardNum" placeholder="1111-2222-3333-4444" value={cardNum} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="expMonth">Exp Month</label>
                    <select type="text" name="expMonth" placeholder="August" value={expMonth} onChange = {onChange}>
                        {
                            expMonthArr.map(month=>{
                                return (
                                    <option key={month} value={month}>{month}</option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor="expYear">Exp Year</label>
                    <input type="text" name="expYear" placeholder="2020" value={expYear} onChange = {onChange}/>
                    <br/>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" name="cvv" placeholder="345" value={cvv} onChange = {onChange}/>
                    <br/>
                    <button type='submit'>Save</button>
                </form>
                <button onClick={()=>{
                    this.props.postOrder(this.props.user.id)
                    .then((order)=>{
                        console.log('create an order: ', order)
                        this.props.history.push('/order')
                     })
                    .catch(errors=>this.setState(errors))
                    
                    }}>Proceed To Checkout</button>
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
        postCreditCard: (userId, cardInfo) => dispatch(postCreditCard(userId, cardInfo)),
        postOrder: (userId) => dispatch(createOrder(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
