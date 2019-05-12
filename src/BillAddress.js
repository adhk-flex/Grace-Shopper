import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userAddress, postAddress} from './store/address';
import {createOrder} from './store/order';
import Errors from './Errors';

class BillAddress extends Component{

    constructor(props){
        super(props)
        this.state = {...this.userBillAddress(), errors: []}
    }

    _mounted = false

    componentDidMount(){
        this._mounted = true
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.address) !== JSON.stringify(this.props.address)){
            if (this.props.isLogin) {
                if(this._mounted){
                    this.props.getBillAddress(this.props.user.id, 'billing')
                    .then(({address})=>this.setState({...address}))
                }
            }
        }
    }

    componentWillUnmount(){
        this._mounted = false
    }

    userBillAddress = (address) => {
        return {
            firstName: address ? address.firstName : '',
            lastName: address ? address.lastName : '',
            addressLine1: address ? address.addressLine1 : '',
            addressLine2: address ? address.addressLine2 : '',
            city: address ? address.city : '',
            state: address ? address.state : '',
            zip: address ? address.zip : '',
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    onSave = (e) => {
        e.preventDefault()
        this.props.postAddress(this.state, this.props.user.id, 'billing')
            .then(()=>{
                this.props.postOrder(this.props.user.id)
                    .then((order)=>{this.props.history.push('/order')})
                    .catch(e=>this.setState({errors: e.response.data.errors}))
            })
            .catch(e=>this.setState({errors: e.response.data.errors}))
    }

    Addressform = (firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange, onSave) => (
        <div>
            <form onSubmit={onSave}>
                <label htmlFor={`firstName`}>FirstName</label>
                <input type="text" name={`firstName`} value={firstName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`lastName`}>LastName</label>
                <input type="text" name={`lastName`} value={lastName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine1`}>address Line1</label>
                <input type="text" name={`addressLine1`} value = {addressLine1} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine2`}>address Line2 Optional</label>
                <input type="text" name={`addressLine2`} value = {addressLine2} onChange = {onChange}/>
                <br/>
                <label htmlFor={`zip`}>Zip Code</label>
                <input type="text" name={`zip`} value = {zip} onChange = {onChange}/>
                <br/>
                <label htmlFor={`state`}>State</label>
                <input type="text" name={`state`} value = {state} onChange = {onChange}/>
                <br/>
                <label htmlFor={`city`}>City</label>
                <input type="text" name={`city`} value = {city} onChange = {onChange}/>
                <br/>
                <button type='submit'>Place Order</button>
            </form>
            <Errors errors={this.state.errors}/>
        </div>
    )

    render(){
        const {firstName, lastName, addressLine1, addressLine2, zip, state, city} = this.state
        const {onChange, onSave} = this
        return(
            <div>
                <h3>Billing Address</h3>
                {
                    this.Addressform(firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange, onSave)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.user && state.user.id ? state.user : false,
        address: state.address,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBillAddress: (userId, type) => dispatch(userAddress(userId, type)),
        postAddress: (dataForm, userId, type) => dispatch(postAddress(dataForm, userId, type)),
        postOrder: (userId) => dispatch(createOrder(userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BillAddress);