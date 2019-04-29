import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
    // componentDidMount(){
    //     this.props.fetchProducts()
    // }
    render() {
        // const Products = props.Products || []
        const history = this.props.history
        // fake data
        // const Products = [
        //     {id: 1, name: 'produc1', imageUrl:'http://lorempixel.com/640/480/abstract', price: 100},
        //     {id: 2, name: 'produc2', imageUrl:'http://lorempixel.com/640/480/abstract', price: 200},
        //     {id: 3, name: 'produc3', imageUrl:'http://lorempixel.com/640/480/abstract', price: 300},
        //     {id: 4, name: 'produc4', imageUrl:'http://lorempixel.com/640/480/abstract', price: 400}
        // ]
        const Products = this.props.products;
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
                <img className = 'shopping-cart' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKorRm0enmL_tFIgvKcNcOjb_3YkWnny-CIK0BW5F9DoGocc7DkA' onClick={()=>{props.history.push('/cart')}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state
    }
};

export default connect(mapStateToProps)(ProductList);
