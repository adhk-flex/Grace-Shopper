import React, {Component} from 'react';
import {connect} from 'react-redux';
import Errors from './Errors';

class CreditCard extends Component{
    constructor(props){
        super(props)
        this.state = {...this.setCreditCard(), errors: []}
    }

    _mounted = false

    componentDidMount(){
        this._mounted = true
    }

    componentWillUnmount(){
        this._mounted = false
    }

    setCreditCard = (creditCard) => {
        return {
            firstName: creditCard ? creditCard.firstName : '',
            lastName: creditCard ? creditCard.lastName : '',
            cardType: creditCard ? creditCard.type : 'visa',
            number: creditCard ? creditCard.number : '',
            cvv: creditCard ? creditCard.cvv : '',
            expMonth: creditCard ? creditCard.expMonth : '',
            expYear: creditCard ? creditCard.expYear : ''
        }
    }

    checkCreditCard = (creditCard) => {
        const errorArr = []
        let hasError = false
        const today = new Date();
        if(creditCard.number.length !== 16){
            "card number is not 16!"
            let error = new Error();
            error.name = 'custom error1';
            error.errors = [{message: 'card number must be 16 digits'}]
            hasError = true
            errorArr.push(error)
            this.setState({...this.state, errors: [...this.state.errors, error]})
            
        }
        if(creditCard.cvv.length !==3){
            let error = new Error();
            error.name = 'custom error2';
            error.errors = [{message: 'cvv must be three numbers long'}]
            hasError = true
            errorArr.push(error)
            this.setState({...this.state, errors: [...this.state.errors, error]})
            
        }
        if (today.getFullYear() > Number(creditCard.expYear) || Number(creditCard.expMonth) < today.getMonth() && today.getFullYear() === Number(creditCard.expYear)){
            let error = new Error();
            error.name = 'custom error3';
            error.errors = [{message: 'Card expiration date has passed'}]
            hasError = true
            errorArr.push(error)
            this.setState({...this.state, errors: [...this.state.errors, error]})
            
        }
        if(hasError){throw errorArr}
        else{
            this.setState({...this.state, errors: []})
        }
        return hasError
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSave = (e) => {
        e.preventDefault()
        let retError = this.checkCreditCard(this.state)
        if(!retError){
            this.props.history.push('/checkoutStep3')
        }
    }

    render(){
        const {firstName, lastName, number, cardType, expMonth, expYear, cvv} = this.state
        const {onChange, onSave} = this
        const creditCardTypeArr = ['cardType', 'visa', 'mastercard', 'amex', 'discover'];
        const expMonthArr = ['month', ...Array.from({length:12},(v,k)=>k+1)];
        const expYearArr = ['year', ...Array.from({length:10},(v,k)=>k+2019)]
        return (
            <div>
                <h3>Credit Card Information</h3>
                <form onSubmit={onSave}>
                    <label htmlFor='firstName'>First Name</label>
                    <input text='firstName' name='firstName' value={firstName} onChange={onChange}/>
                    <br/>
                    <label htmlFor='lastName'>Last Name</label>
                    <input text='lastName' name='lastName' value={lastName} onChange={onChange}/>
                    <br/>
                    <label htmlFor='cardType'>Card Type</label>
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
                    <label htmlFor='number'>Card Number</label>
                    <input text='number' name='number' value={number} onChange={onChange}/>
                    <br/>
                    <label htmlFor='expMonth'>Exp. Month</label>
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
                    <label htmlFor='expYear'>Exp. Year</label>
                    <select type="text" name="expYear" value={expYear} onChange= {onChange}>
                        {
                            expYearArr.map(year=>{
                                return (
                                    <option key={year} value={year}>{year}</option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor='cvv'>cvv</label>
                    <input text='cvv' name='cvv' value={cvv} onChange={onChange}/>  
                    <br/>
                    <button type='submit'>Save and Proceed</button>  
                </form>
                <Errors errors={this.state.errors}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.user && state.user.id ? state.user : false,
        user: state.user,
    }
}

export default connect(mapStateToProps,null)(CreditCard);