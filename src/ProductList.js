import React from 'react';

const ProductList = (props) => {
    // const Products = props.Products || []
    const history = props.history
    // fake data
    const Products = [
        {id: 1, name: 'produc1', imageUrl:'http://lorempixel.com/640/480/abstract', price: 100},
        {id: 2, name: 'produc2', imageUrl:'http://lorempixel.com/640/480/abstract', price: 200},
        {id: 3, name: 'produc3', imageUrl:'http://lorempixel.com/640/480/abstract', price: 300},
        {id: 4, name: 'produc4', imageUrl:'http://lorempixel.com/640/480/abstract', price: 400}
    ]
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
                                {p.price}
                            </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default ProductList
