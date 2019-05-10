import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userAddress} from './store/address';

class ShipAddress extends Component{

    constructor(props){
        super(props)
        this.state = this.userShipAddress(this.props.address)
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id){
            this.props.getShipAddress(this.props.user.id, 'shipping')
        }
    }

    userShipAddress = (address) => {
        return (
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
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSave = (e) => {
        e.preventDefault()
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
        const userId = this.props.user.id;
        this.props.postAddress(address, userId, address.addressType)
        .catch(ex=>console.log(ex))
    }
    
    Addressform = (addressType, firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange, onSave) => (
        <form onSubmit={(e) => onSaveAddress(addressType, e)}>
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
                <button type='submit'>{`Save ${addressType}`}</button>
        </form>
    )

    render(){
        const {firstName, lastName, addressLine1, addressLine2, zip, state, city} = this.state
        const {onChange, onSave} = this
        return(
            <div>
                <h3>Shipping Address</h3>
                {
                    this.Addressform('shipping', firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange, onSave)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.address,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getShipAddress: (userId, type) => dispatch(userAddress(userId, type))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ShipAddress);