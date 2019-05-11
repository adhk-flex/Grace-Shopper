import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lineItems, fetchLineItems } from './store/lineitem';

class ManageProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.cart.id !== this.props.cart.id){
            this.props.fetchLineItems(this.props.cart.id)
        }     
    }
    render(){
        const history = this.props.history;
        const Products = this.props.products;
        const totalItems = this.props.lineItems.reduce((acc, item) => {
            acc += item.quantity
            return acc
        }, 0)
        return(
            <div>
                <h1>Here are All of our Products:</h1>
                <ul className='list-group'>
                    {
                        Products.map(p=>{
                            return (
                                <li key={p.id} className='list-group-item'>
                                    <span>{p.name}</span>
                                    <img className='product-image' onClick={()=>history.push(`/product/${p.id}`)} src={p.imageUrl}/>
                                    <p>${p.price}</p>
                                </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}  

const mapStateToProps = (state) => {
    return {
        products: state.products,
        lineItems: state.lineItems,
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLineItems: cartId => dispatch(fetchLineItems(cartId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
