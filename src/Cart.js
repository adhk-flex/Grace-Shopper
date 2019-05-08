import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchLineItems, updateLineItem, delLineItem } from './store/lineitem';

class Cart extends Component {
    constructor (props) {
        super(props)
        this.state = { }
    }

    async componentDidMount(){
        const cartId = this.props.cart && this.props.cart.id? this.props.cart.id:false
        await this.props.fetchLineItems(cartId)
    }

    onChange = (item, e) => {
        this.setState(item)
        this.setState({quantity: e.target.value})
    };

    onUpdate = e => {
        e.preventDefault()
        const {id, cartId, quantity} = this.state
        // console.log(this.state)
        // console.log("Quantity", quantity)
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
        console.log("props", this.props)
        console.log("state", this.state)
        const {lineItems} = this.props;
        const { onChange, onUpdate, onDelete } = this;
        const TotalAmount = parseFloat(lineItems.reduce((acc, item) => {
            acc += item.quantity * item.price
            return acc
        }, 0)).toFixed(2);
        console.log('isLogin: ', this.props.isLogin)
        if(!lineItems){
            return null
        }else{
            return(
                <div>
                    <h1>Here are all the products in your cart!</h1>
                    <ul>
                        {lineItems.map(p=>{
                            const total = parseFloat(p.quantity * p.price).toFixed(2);
                            return (
                                <li key={p.id}>
                                    <span>{`Name: ${p.name}, Price: ${p.price}`}</span>
                                    <br/>
                                    <img className = 'product-image' src={p.imageUrl}/>
                                    <form onSubmit={onUpdate}>
                                        <label htmlFor='quantity'>Quantity</label>
                                        <input name='quantity' placeholder={p.quantity} onChange={(e) => onChange(p, e)}/>
                                        <button type='submit'>Update</button>
                                    </form>
                                    <br />
                                    <span>Subtotal: ${total}</span>
                                    <br />
                                    <span>Don't want this product?</span>
                                    <button onClick={() => onDelete(p.id, p.cartId)}>Delete</button>
                                </li>
                            )
                        })}
                    </ul>
                    <span>{`Total Amount: $${TotalAmount}`}</span>
                    <button onClick={()=>this.props.history.push('/checkout')}>Check Out!</button>
                </div>
            )
        }
        
    }
}

const mapStateToProps = ({products, user, cart, lineItems}) => {
    return {
        products:  products? products:false,
        isLogin: user&&user.id? user.id:false,
        cart: cart? cart:false,
        lineItems: lineItems? lineItems:false
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