import React from 'react';
import {connect} from 'react-redux';

const Cart = (props) =>{
    const Products = props.products
    console.log('isLogin: ', props.isLogin)
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

const mapStateToProps = ({products, user}) => {
    return {
        products:  products,
        isLogin: user.id,
    }
}

export default connect(mapStateToProps)(Cart)