import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchLineItems, updateLineItem, delLineItem } from './store/lineitem';

class Cart extends Component {
    componentDidMount(){
        this.props.fetchLineItems(this.props.cart.id)
    }

    componentDidUpdate(prevProps){
        if (prevProps.cart.id !== this.props.cart.id){
            this.props.fetchLineItems(this.props.cart.id)
        }
    }

    onChange = (item, e) => {
        const locateItem = this.props.lineItems.find(i => i.id === item.id)
        locateItem.quantity = Number(e.target.value)
    };

    onUpdate = (item, e) => {
        e.preventDefault()
        const {quantity, id, cartId} = item;
        if (quantity === 0) {
            this.props.delLineItem(id, cartId)
        } else {
            this.props.updateLineItem(id, item, cartId)
        } 
    }

    onDelete = (id, cartId) => {
        this.props.delLineItem(id, cartId)
    }


    render () {
        const {lineItems} = this.props;
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
                        {lineItems.map(p=>{
                            const total = parseFloat(p.quantity * p.price).toFixed(2);
                            return (
                                <li key={p.id}>
                                    <span>{`Name: ${p.name}, Price: ${p.price}`}</span>
                                    <br />
                                    <img className = 'product-image' src={p.imgUrl}/>
                                    <form onSubmit={(e) => onUpdate(p, e)}>
                                        <label htmlFor='quantity'>Quantity</label>
                                        <input name='quantity' placeholder={p.quantity} onChange={(e) => onChange(p, e)}/>
                                        <button type='submit'>Update</button>
                                    </form>
                                    <br />
                                    <span>Subtotal: ${total}</span>
                                    <br />
                                    <span>Don't want this product?</span>
                                    <button onClick={() => onDelete(p.id, p.cartId)}> Delete </button>
                                </li>
                            )
                        })}
                    </ul>
                    <span>{`Total Amount: $${totalAmount}`}</span>
                    <button onClick={()=>this.props.history.push('/checkout')} disabled={disableCheckout} > Check Out! </button>
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