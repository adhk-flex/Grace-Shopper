import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userAddress, postAddress, convertAddresses} from './store/address';
import {createOrder, createGuestOrder, updateGuestOrder, updateOrder} from './store/order';
import {convertLineItem, updateLineItem} from './store/lineitem';
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
            this.setState({...this.setState, errors: []})
        } 
        return hasError
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    onSave = (e) => {
        e.preventDefault()
        let retError = this.checkAddress(this.state)
        const userId = this.props.user.id;
        if(!retError){
            this.props.postAddress(this.state, userId, 'billing')
            .then(()=>{
                let order={};
                if(!userId){
                    this.props.createGuestOrder()
                    .then((neworder)=>{
                        order=neworder;
                    })
                    .then(()=> this.props.convertLineItem(order.id))
                    .then(()=> this.props.convertAddresses())
                    .then((arr)=>{
                        let totalAmount = this.props.lineItems.reduce((orderTotal, item)=>
                            item.quantity*item.price, 0);
                        return this.props.updateGuestOrder(order.id, {...order, 
                                                                        totalAmount: totalAmount*1, 
                                                                        shippingAddressId: arr[0].id, 
                                                                        billingAddressId: arr[1].id
                                                                    })
                    })
                    .catch(e=>this.setState({errors: e?e.response.data.errors:[]    }))
                }
                else{
                    this.props.postOrder(userId)
                        .then(() => this.props.lineItems.forEach(item => {
                            item.orderId = this.props.order.id
                            item.cartId = null
                            this.props.updateLineItem(item)
                        }))
                        .then(() => console.log('lineitems', this.props.lineItems))
                        .then(() => {
                            let total = this.props.lineItems.reduce((acc, item) => {
                                acc += item.quantity * item.price
                                return acc
                            }, 0)
                            this.props.updateOrder(this.props.order.id, {...this.props.order, totalAmount: total}, userId)
                        })
                        .then(()=>this.props.updateLineItem({clean: true}))
                    
                        .then(() => this.props.history.push('./order'))
                    // .catch(e=>this.setState({errors: e.response.data.errors}))
                }
                    
            })
            .catch(e=>this.setState({errors: e.response.data.errors}))
        }
        
    }

    Addressform = (firstName, lastName, addressLine1, addressLine2, zip, state, city, onChange, onSave) => (
        <div>
            <form onSubmit={onSave}>
                <label htmlFor={`firstName`}>FirstName</label>
                <input className='form-control' type="text" name={`firstName`} value={firstName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`lastName`}>LastName</label>
                <input className='form-control' type="text" name={`lastName`} value={lastName} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine1`}>address Line1</label>
                <input className='form-control' type="text" name={`addressLine1`} value = {addressLine1} onChange = {onChange}/>
                <br/>
                <label htmlFor={`addressLine2`}>address Line2 Optional</label>
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
                <button type='submit' className='btn btn-primary'>Place Order</button>
                {!this.props.user.id&&this.props.order.orderNumber?<h4>You order has been placed: {this.props.order.orderNumber}</h4>:null}
            </form>
            <Errors errors={this.state.errors}/>
        </div>
    )

    render(){
        const {firstName, lastName, addressLine1, addressLine2, zip, state, city} = this.state
        const {onChange, onSave} = this
        return(
            <div>
                <h1>Billing Address</h1>
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
        user: state.user,
        order: state.order,
        lineItems: state.lineItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGuestOrder: () => dispatch(createGuestOrder()),
        updateGuestOrder: (orderId, order) => dispatch(updateGuestOrder(orderId, order)),
        convertAddresses: () => dispatch(convertAddresses()),
        convertLineItem: (orderId) => dispatch(convertLineItem(orderId)),
        getBillAddress: (userId, type) => dispatch(userAddress(userId, type)),
        postAddress: (dataForm, userId, type) => dispatch(postAddress(dataForm, userId, type)),
        postOrder: (userId) => dispatch(createOrder(userId)),
        updateOrder: (orderId, formData, userId) => dispatch(updateOrder(orderId, formData, userId)),
        updateLineItem: (item) => dispatch(updateLineItem(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BillAddress);