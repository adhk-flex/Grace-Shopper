import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchLineItems, updateLineItem, delLineItem } from './store/lineitem';

class Cart extends Component {
    constructor () {
        super()
        this.state = { }
    }

    componentDidMount(){
        const cartId = this.props.cart.id
        this.props.fetchLineItems(cartId)
    }

    onChange = (item, e) => {
        this.setState(item)
        this.setState({quantity: e.target.value})
    };

    onUpdate = e => {
        e.preventDefault()
        const {id, cartId, quantity} = this.state
        console.log(this.state)
        console.log("Quantity", quantity)
        if (quantity === "0") {
            this.props.delLineItem(id, cartId)
        } else {
            this.props.updateLineItem(id, this.state, cartId)
        } 
    }

    onDelete = (id, cartId) => {
        this.props.delLineItem(id, cartId)
    }

    render () {
        const {lineItems} = this.props;
        const { onChange, onUpdate, onDelete } = this;
        const TotalAmount = lineItems.reduce((acc, item) => {
            acc += item.quantity * item.price
            return acc
        }, 0)
        console.log('isLogin: ', this.props.isLogin)
        if(!lineItems){
            return null
        }else{
            return(
                <div>
                    <h1>Here are all the products in your cart!</h1>
                    <ul>
                        {lineItems.map(p=>{
                            const total = p.quantity * p.price;
                            return (
                                <div>
                                <li key={p.id}>
                                    <span>{`Name: ${p.name}, Price: ${p.price}`}</span>
                                    <br/>
                                    <img className = 'product-image' src={p.imageUrl}/>
                                    <span>{`Quantity: ${p.quantity}, Total: ${total}`}</span>
                                    <form onSubmit={onUpdate}>
                                        <label htmlFor='quantity'>Quantity</label>
                                        <input name='quantity' onChange={(e) => onChange(p, e)}/>
                                        <button type='submit'>Update</button>
                                    </form>
                                    <p>Don't want this product?</p>
                                    <button onClick={() => onDelete(p.id, p.cartId)}>Delete</button>
                                </li>
                                </div>
                            )
                        })}
                    </ul>
                    <span>{`Total Amount: ${TotalAmount}`}</span>
                    <button onClick={()=>this.props.history.push('/checkout')}>Check Out!</button>
                </div>
            )
        }
        
    }
}

const mapStateToProps = ({products, user, cart, lineItems}) => {
    return {
        products:  products,
        isLogin: user.id,
        cart: cart,
        lineItems: lineItems
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