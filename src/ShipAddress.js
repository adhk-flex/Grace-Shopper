import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userAddress, postAddress} from './store/address';
import Errors from './Errors';

class ShipAddress extends Component{

    constructor(props){
        super(props)
        this.state = {...this.userShipAddress(), errors:[]}
    }

    componentDidMount(){
        this._mounted = true
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.address)!==JSON.stringify(this.props.address)){
            if (this.props.isLogin) {
                this.props.getShipAddress(this.props.user.id, 'shipping')
                .then(({address})=>{
                    if(this._mounted){
                        this.setState({...address})
                    }
                })
            }
        }
    }

    componentWillUnmount(){
        this._mounted = false  
    }

    _mounted = false

    checkAddress = (address) => {
        const errorArr = []
        let hasError = false
        if(address.zip.length !== 5){
            let error = new Error();
            error.name = 'custom error1';
            error.errors = [{message: 'zip code must be 5 digits'}]
            hasError = true
            errorArr.push(error)
            this.setState({...this.state, errors: [...this.state.errors, error]})
        }
        if(address.state.length !==2){
            let error = new Error();
            error.name = 'custom error2';
            error.errors = [{message: 'state must contain exact two letters'}]
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
        this.setState({[e.target.name]: e.target.value}, ()=>console.log(this.state))
    } 

    onSave = (e) => {
        e.preventDefault()
        let retError = this.checkAddress(this.state)
        if(!retError){
            this.props.postAddress(this.state, this.props.user.id, 'shipping')
            .then(() => {this.props.history.push('/checkoutStep2')})
            .catch((e) => {this.setState({errors: e.response.data.errors})})
        }
    }
    
    Addressform = (firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange, onSave) => (
        <div>
            <form onSubmit={onSave}>
                <label htmlFor={`firstName`}>First Name</label>
                <input className='form-control' type="text" name={`firstName`} value={firstName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`lastName`}>Last Name</label>
                <input className='form-control' type="text" name={`lastName`} value={lastName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine1`}>Address Line1</label>
                <input className='form-control' type="text" name={`addressLine1`} value = {addressLine1} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine2`}>Address Line2 (Optional)</label>
                <input className='form-control' type="text" name={`addressLine2`} value = {addressLine2} onChange = {onChange}/>
                <br/>
                <label htmlFor={`zip`}>Zip Code</label>
                <input className='form-control' type="text" name={`zip`} value = {zip} onChange = {onChange}/>
                <br/>
                <label htmlFor={`state`}>State</label>
                <input className='form-control' type="text" name={`state`} value = {state} onChange = {onChange}/>
                <br/>
                <label htmlFor={`city`}>City</label>
                <input className='form-control' type="text" name={`city`} value = {city} onChange = {onChange}/>
                <br/>
                <button type='submit' className='btn btn-primary'>Save and Proceed</button>
            </form>
            <Errors errors={this.state.errors}/>
        </div>
    )

    render(){
        const {firstName, lastName, addressLine1, addressLine2, zip, state, city} = this.state
        const {onChange, onSave} = this
        return(
            <div>
                <h1>Shipping Address</h1>
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
        getShipAddress: (userId, type) => dispatch(userAddress(userId, type)),
        postAddress: (dataForm, userId, type) => dispatch(postAddress(dataForm, userId, type))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShipAddress);