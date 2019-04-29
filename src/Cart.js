import React from 'react';
import {connect} from 'react-redux';

const Cart = (props) =>{
    const Products = props.products
    return(
        <div>
            <h1>Here are all the products in your cart!</h1>
            <ul>
                {Products.map(p=>{
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

const mapStateToProps = (state) => {
    return {
        products:  state
    }
}

export default connect(mapStateToProps)(Cart)