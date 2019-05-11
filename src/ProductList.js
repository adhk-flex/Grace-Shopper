import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFilteredProducts } from './store/product';
import { getProductByPg, fetchProducts } from './store/product'
import Pager from './Pager';
import CategoryNav from './CategoryNav';
import { lineItems, fetchLineItems } from './store/lineitem';
import Search from './Search';
import Errors from './Errors';


class ProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            errors: [],
        }
    }

    componentDidMount(){
        const { srchVal, catId, pgIdx } = this.props.match.params;     

        if(srchVal || catId){
            this.props.fetchFilteredProducts(srchVal, catId, pgIdx)
                .catch(({response})=>{this.setState({errors: e.response.data.errors})})
        } else {
            this.props.fetchProducts()
                .catch(({response})=>{this.setState({errors: e.response.data.errors})})
	    }
    }



    componentDidUpdate(prevProps){
        const { srchVal, catId, pgIdx } = this.props.match.params;
        if(prevProps.cart.id !== this.props.cart.id){
            this.props.fetchLineItems(this.props.cart.id)
                .catch(({response})=>{this.setState({errors: e.response.data.errors})})
        }     

        if(JSON.stringify(this.props.match.params) !== JSON.stringify(prevProps.match.params)){
            if(srchVal || catId){
                this.props.fetchFilteredProducts(srchVal, catId, pgIdx)
                .catch(({response})=>{this.setState({errors: e.response.data.errors})})
            }
        }   
        
        if(prevProps.match.params.idx !== this.props.match.params.idx){
            if(!srchVal && !catId){
                if (this.props.match.params.idx === undefined) {
                    this.props.fetchProducts()
                        .catch(({response})=>{this.setState({errors: e.response.data.errors})})
                } else {
                this.props.getProductByPg(this.props.match.params.idx)
                    .catch(({response})=>{this.setState({errors: e.response.data.errors})})
                }
            }
        }  
    }
    render(){
        const history = this.props.history;
        const Products = this.props.products.slice(0, 10);
        const totalItems = this.props.lineItems.reduce((acc, item) => {
            acc += item.quantity
            return acc
        }, 0)
        return(
            <div>
                <Pager history={history} match ={this.props.match} />
                <h1>Here are All of our Products:</h1>
                <Search history={history} match={this.props.match} />
                <CategoryNav history={history} match={this.props.match} />
                <ul className='list-group'>
                    {
                        Products.map(p=>{
                            return (
                                <li key={p.id} className='list-group-item'>
                                    <span>{p.name}</span>
                                    <img className='product-image' onClick={()=>history.push(`/product/${p.id}`)} src={p.imgUrl}/>
                                    <p>${p.price}</p>
                                </li>)
                        })
                    }
                </ul>
                <img className = 'shopping-cart' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKorRm0enmL_tFIgvKcNcOjb_3YkWnny-CIK0BW5F9DoGocc7DkA' onClick={()=>{history.push('/cart')}}/>
                <span className = 'shopping-item-quantity'>{totalItems}</span>
            <Errors errors={this.state.errors} />
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
        fetchFilteredProducts: (srchVal, catId, pgIdx) => dispatch(fetchFilteredProducts(srchVal, catId, pgIdx)),
        fetchProducts: () => dispatch(fetchProducts()),
        getProductByPg: pgIdx => dispatch(getProductByPg(pgIdx))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
