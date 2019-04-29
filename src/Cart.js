import React from 'react';

const Cart = () =>{
    //fake data
    const Products = [
        {id: 1, name: 'produc1', imageUrl:'http://lorempixel.com/640/480/abstract', price: 100},
        {id: 2, name: 'produc2', imageUrl:'http://lorempixel.com/640/480/abstract', price: 200},
        {id: 3, name: 'produc3', imageUrl:'http://lorempixel.com/640/480/abstract', price: 300},
        {id: 4, name: 'produc4', imageUrl:'http://lorempixel.com/640/480/abstract', price: 400}
    ]
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
                            <br/>
                            <p>{p.description}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Cart