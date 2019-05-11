import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userAddress, postAddress} from './store/address';

class ShipAddress extends Component{

    constructor(props){
        super(props)
        this.state = this.userShipAddress()
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps)!==JSON.stringify(this.props)){
            this.props.getShipAddress(this.props.user.id, 'shipping')
            .then(({address})=>this.setState({...address}))
        }
    }

    userShipAddress = (address) => {
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
    
    Addressform = (firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange) => (
        <div>
        <form>
                <label htmlFor={`firstName`}>First Name</label>
                <input type="text" name={`firstName`} value={firstName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`lastName`}>Last Name</label>
                <input type="text" name={`lastName`} value={lastName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine1`}>Address Line1</label>
                <input type="text" name={`addressLine1`} value = {addressLine1} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine2`}>Address Line2 (Optional)</label>
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
        </form>
        <button  
            onClick={
                ()=>{
                    this.props.postAddress(this.state, this.props.user.id, 'shipping')
                    this.props.history.push('/checkoutStep2')
                }
            }
        >save and proceed</button>
        </div>
    )

    render(){
        const {firstName, lastName, addressLine1, addressLine2, zip, state, city} = this.state
        const {onChange} = this
        return(
            <div>
                <h3>Shipping Address</h3>
                {
                    this.Addressform(firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange)
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
        getShipAddress: (userId, type) => dispatch(userAddress(userId, type)),
        postAddress: (dataForm, userId, type) => dispatch(postAddress(dataForm, userId, type))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShipAddress);