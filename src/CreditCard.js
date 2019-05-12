import React, {Component} from 'react';
import {connect} from 'react-redux';
//mport { getCreditCard, postCreditCard } from './store/creditcards';
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

    componentDidUpdate(prevProps){
        // if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
        //     if (this.props.isLogin) {
        //         this.props.getCreditCard(this.props.user.id)
        //         .then(({creditCard})=>{
        //             if (this._mounted){
        //                 this.setState({...creditCard})
        //             }
        //         })
        //     }
        // }
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

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSave = (e) => {
        e.preventDefault()
        //add validations here for credit card number @Haoyu

        //Removing the following POST call since we no longer want to persist CC info.

        // this.props.postCreditCard(this.props.user.id, this.state)
        // .then(()=>{this.props.history.push('/checkoutStep3')})
        // .catch(e=>this.setState({errors: e.response.data.errors}))
        this.props.history.push('/checkoutStep3')
    }

    render(){
        const {firstName, lastName, number, cardType, expMonth, expYear, cvv} = this.state
        const {onChange, onSave} = this
        const creditCardTypeArr = ['cardType', 'visa', 'mastercard', 'amex', 'discover'];
        const expMonthArr = ['month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
                    <input text='expYear' name='expYear' value={expYear} onChange={onChange}/>
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
        //creditCard: state.creditCard
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         //getCreditCard: (userId) => dispatch(getCreditCard(userId)),
//         postCreditCard: (userId, cardInfo) => dispatch(postCreditCard(userId, cardInfo))
//     }
// }

export default connect(mapStateToProps,null)(CreditCard);