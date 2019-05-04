import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchLineItems, updateLineItem } from './store';

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
        const {id, cartId} = this.state
        this.props.updateLineItem(id, this.state, cartId)
    }

    render () {
        const {products, lineItems} = this.props;
        const { onChange, onUpdate } = this;
        console.log('isLogin: ', this.props.isLogin)
        if(!lineItems){
            return null
        }else{
            return(
                <div>
                    <h1>Here are all the products in your cart!</h1>
                    <ul>
                        {lineItems.map(p=>{
                            return (
                                <div>
                                <li key={p.id}>
                                    <span>{`Name: ${p.name}, Price: ${p.price}`}</span>
                                    <br/>
                                    <img className = 'product-image' src={p.imageUrl}/>
                                    <span>{`Quantity: ${p.quantity}`}</span>
                                    <form onSubmit={onUpdate}>
                                        <label htmlFor='quantity'>Quantity</label>
                                        <input name='quantity' onChange={(e) => onChange(p, e)}/>
                                        <button type='submit'>Update</button>
                                    </form>

                                </li>
                                </div>
                            )
                        })}
                    </ul>
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
        updateLineItem: (id, formData, cartId) => dispatch(updateLineItem(id, formData, cartId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);