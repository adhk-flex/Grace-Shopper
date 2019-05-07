import React, { Component } from 'react';
import { connect } from 'react-redux';

const ProductList = (props) => {
    const history = props.history;
    const Products = props.products;
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
            <img className = 'shopping-cart' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKorRm0enmL_tFIgvKcNcOjb_3YkWnny-CIK0BW5F9DoGocc7DkA' onClick={()=>{history.push('/cart')}}/>
        </div>
    )
    }


const mapStateToProps = ({products}) => {
    return {
        products: products
    }
};

export default connect(mapStateToProps)(ProductList);
