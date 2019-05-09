import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lineItems, fetchLineItems  } from './store/lineitem';
import { fetchFilteredProducts } from './store/product';
import Search from "./Search";

class ProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        const { srchVal, catId } = this.props.match.params;     

        if(srchVal || catId){
            this.props.fetchFilteredProducts(srchVal, catId);
        }
    }
    componentDidUpdate(prevProps){
        const { srchVal, catId } = this.props.match.params;
        if(prevProps.cart.id !== this.props.cart.id){
            this.props.fetchLineItems(this.props.cart.id)
        }     

        if(JSON.stringify(this.props.match.params) !== JSON.stringify(prevProps.match.params)){
            if(srchVal || catId){
                this.props.fetchFilteredProducts(srchVal, catId);
            }
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
                <Search history={history} match={this.props.match}/>
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
                <img className = 'shopping-cart' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKorRm0enmL_tFIgvKcNcOjb_3YkWnny-CIK0BW5F9DoGocc7DkA' onClick={()=>{history.push('/cart')}}/>
                <span className = 'shopping-item-quantity'>{totalItems}</span>
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
        fetchFilteredProducts: (srchVal, catId) => dispatch(fetchFilteredProducts(srchVal, catId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
