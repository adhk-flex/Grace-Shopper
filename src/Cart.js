import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchLineItems } from './store';

class Cart extends Component {
    componentDidMount(){
        const cartId = this.props.cart.id
        this.props.fetchLineItems(cartId)
    }

    render () {
        const {products, lineItems} = this.props
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
                                <li key={p.id}>
                                    <span>{`Name: ${p.name}, Price: ${p.price}`}</span>
                                    <br/>
                                    <img className = 'product-image' src={p.imageUrl}/>
                                </li>
                            )
                        })}
                    </ul>
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
        fetchLineItems: cartId => dispatch(fetchLineItems(cartId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);