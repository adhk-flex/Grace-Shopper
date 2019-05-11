import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getCreditCard, postCreditCard } from './store/creditcards';

class CreditCard extends Component{
    constructor(){
        super()
        this.state = this.setCreditCard()
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id){
            this.props.getCreditCard(this.props.user.id)
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
                    <input text='cardType' name='cardType' value={cardType} onChange={onChange}/>
                    <br/>
                    <label htmlFor='cardNumber'>cardNumber</label>
                    <input text='cardNumber' name='cardNumber' value={cardNumber} onChange={onChange}/>
                    <br/>
                    <label htmlFor='expMonth'>expMonth</label>
                    <input text='expMonth' name='expMonth' value={expMonth} onChange={onChange}/>
                    <br/>
                    <label htmlFor='expYear'>expYear</label>
                    <input text='expYear' name='expYear' value={expYear} onChange={onChange}/>
                    <br/>
                    <label htmlFor='cvv'>cvv</label>
                    <input text='cvv' name='cvv' value={cvv} onChange={onChange}/>
                    <br/>
                    <button type ='submit'>Save Credit Card</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCreditCard: (userId) => dispatch(getCreditCard(userId)),
        postCreditCard: (userId, cardInfo) => dispatch(postCreditCard(userId, cardInfo))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreditCard);