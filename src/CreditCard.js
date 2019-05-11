import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getCreditCard, postCreditCard } from './store/creditcards';

class CreditCard extends Component{
    constructor(props){
        super(props)
        this.state = this.setCreditCard()
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.props.getCreditCard(this.props.user.id)
            .then(({creditCard})=>this.setState({...creditCard, cardNumber: creditCard.number}))
        }
    }

    setCreditCard = (creditCard) => {
        return {
            firstName: creditCard ? creditCard.firstName : '',
            lastName: creditCard ? creditCard.lastName : '',
            cardType: creditCard ? creditCard.type : 'visa',
            cardNumber: creditCard ? creditCard.cardNumber : '',
            cvv: creditCard ? creditCard.cvv : '',
            expMonth: creditCard ? creditCard.expMonth : '',
            expYear: creditCard ? creditCard.expYear : ''
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSave = (e) => {
        e.preventDefault()
        this.props.postCreditCard(this.props.user.id, {...this.state, number: this.state.cardNumber})
    }

    render(){
        const {firstName, lastName, cardNumber, cardType, expMonth, expYear, cvv} = this.state
        const {onChange, onSave} = this
        const creditCardTypeArr = ['cardType', 'visa', 'mastercard', 'amex', 'discover'];
        const expMonthArr = ['month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return (
            <div>
                <h3>Credit Card Information</h3>
                <form onSubmit={onSave}>
                    <label htmlFor='firstName'>firstName</label>
                    <input text='firstName' name='firstName' value={firstName} onChange={onChange}/>
                    <br/>
                    <label htmlFor='lastName'>lastName</label>
                    <input text='lastName' name='lastName' value={lastName} onChange={onChange}/>
                    <br/>
                    <label htmlFor='cardType'>cardType</label>
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
                    <label htmlFor='cardNumber'>cardNumber</label>
                    <input text='cardNumber' name='cardNumber' value={cardNumber} onChange={onChange}/>
                    <br/>
                    <label htmlFor='expMonth'>expMonth</label>
                    <select type="text" name="expMonth" value={expMonth} onChange = {onChange}>
                        {
                            expMonthArr.map(month=>{
                                return (
                                    <option key={month} value={month}>{month}</option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor='expYear'>expYear</label>
                    <input text='expYear' name='expYear' value={expYear} onChange={onChange}/>
                    <br/>
                    <label htmlFor='cvv'>cvv</label>
                    <input text='cvv' name='cvv' value={cvv} onChange={onChange}/>
                    <br/>
                    <button type ='submit'>Save Credit Card</button>
                </form>
                <button onClick={()=>this.props.history.push('/checkoutStep3')}>proceed</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        creditCard: state.creditCard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCreditCard: (userId) => dispatch(getCreditCard(userId)),
        postCreditCard: (userId, cardInfo) => dispatch(postCreditCard(userId, cardInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreditCard);