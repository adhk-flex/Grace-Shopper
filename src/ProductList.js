import React from 'react';

const ProductList = (props) => {
    const Products = props.Products || []
    return(
        <div>
            <h1>ProductList Page</h1>
            <ul>
                {
                    Products.map(p=>{
                        return (<li key={p.id}>{p.name}</li>)
                    })
                }
            </ul>
        </div>
    )
}

export default ProductList
