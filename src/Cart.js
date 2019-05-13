import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchLineItems, updateLineItem, delLineItem } from './store/lineitem';
import Errors from './Errors';

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            errors: [],
            quantity: '',
        }
    }
    componentDidMount(){
        this.props.fetchLineItems(this.props.cart.id)
            .catch(e => {this.setState({errors: e.response.data.errors})})

    }

    componentDidUpdate(prevProps){
        if (prevProps.cart.id !== this.props.cart.id){
            this.props.fetchLineItems(this.props.cart.id)
            .catch(e => {this.setState({errors: e.response.data.errors})})
        }
    }

    onChange = (e) => {
        this.setState({quantity: e.target.value})
    };

    onUpdate = (item, e) => {
        e.preventDefault()
        item.quantity = Number(this.state.quantity)
        const productQuantity = this.props.products.find(p => p.id === item.productId).quantity
        console.log(productQuantity)
        console.log('item on Update', item)
        if (item.quantity === 0) {
            console.log('deleting')
            this.props.delLineItem(item)
                .catch(e => {this.setState({errors: e.response.data.errors})})
        } else {
            console.log('updating')
            if (item.quantity <= productQuantity) {
                this.props.updateLineItem(item)
                    .catch(e => {this.setState({errors: e.response.data.errors})})
            } else {
                this.setState({errors: [`entered quantity must less or equal to the stock available quantity: ${productQuantity}`]})
            }
        }

    }

    onDelete = (item) => {
        this.props.delLineItem(item)
            .catch(e => {this.setState({errors: e.response.data.errors})})
    }


    render () {
        const {lineItems} = this.props;
        console.log('loggingline in cart', lineItems)
        const { onChange, onUpdate, onDelete } = this;
        const totalAmount = lineItems.reduce((acc, item) => {
            acc += item.quantity * item.price
            return acc
        }, 0)
        const disableCheckout = totalAmount === 0;
        if (!lineItems){
            return null
        } else {
            return (
                <div>
                    <h1>Here are all the products in your cart!</h1>
                    <ul>
                        {lineItems.map((p, idx)=>{
                            const total = parseFloat(p.quantity * p.price).toFixed(2);
                            const productQuantity = this.props.products.find(product => product.id === p.productId).quantity
                            return (
                                <li key={idx}>
                                    <span>{`Name: ${p.name}, Price: ${p.price}`}</span>
                                    <br />
                                    <img className = 'product-image' src={p.imgUrl}/>
                                    <br />
                                    <span>{`Available Quantity: ${productQuantity} `}</span>
                                    <br />
                                    <form onSubmit={(e) => onUpdate(p, e)}>
                                        <label htmlFor='quantity'>Quantity</label>
                                        <input name='quantity' placeholder={p.quantity} onChange={onChange}/>
                                        <button type='submit'>Update</button>
                                    </form>
                                    <br />
                                    <span>Subtotal: ${total}</span>
                                    <br />
                                    <span>Don't want this product?</span>
                                    <button onClick={() => onDelete(p)}> Delete </button>
                                </li>
                            )
                        })}
                    </ul>
                    <span>{`Total Amount: $${totalAmount}`}</span>
                    <button onClick={()=>{
                        if (!this.props.isLogin){
                            this.props.history.push('/checkoutStep0')
                        } else {
                            this.props.history.push('./checkoutStep1')
                        }}} disabled={disableCheckout} >Check Out!</button>
                <Errors errors={this.state.errors} />
                </div>
            )
        }
        
    }
}

const mapStateToProps = ({products, user, cart, lineItems}) => {
    return {
        products:  products ? products : false,
        isLogin: user && user.id ? user.id : false,
        cart: cart ? cart : false,
        lineItems: lineItems ? lineItems : false
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLineItems: cartId => dispatch(fetchLineItems(cartId)),
        updateLineItem: (id, formData, cartId) => dispatch(updateLineItem(id, formData, cartId)),
        delLineItem: (id, cartId) => dispatch(delLineItem(id, cartId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);