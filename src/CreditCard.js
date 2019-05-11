import React, {Component} from 'react';
import {connect} from 'react-redux';
import { creditCard } from './store/creditcards';

class CreditCard extends Component{
    constructor(){
        super()
        this.state = {}
    }

    componentDidUpdate(){

    }

    setCreditCard = (creditCard) => {
        return {
            firstName: creditCard ? creditCard.firstName : '',
            lastName: creditCard ? creditCard.lastName : '',
            cardType: creditCard ? creditCard.type : '',
            cardNumber: creditCard ? creditCard.cardNumber : '',
            cvv: creditCard ? creditCard.cvv : '',
            expMonth: creditCard ? creditCard.expMonth : '',
            expYear: creditCard ? creditCard.expYear : ''
        }
    }

    render(){
        return (
            <div>
                <h3>Credit Card Information</h3>
            </div>
        )
    }
}

export default CreditCard;