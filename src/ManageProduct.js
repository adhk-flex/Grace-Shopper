import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './store/product';
import ProductForm from './ProductForm';

class ManageProduct extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const history = this.props.history;
        const products = this.props.products;
        return(
            <div>
                {/* <Pager history={history} match ={this.props.match}/> */}
                <h1>Manage All Products</h1>
                {/* <Search history={history} match={this.props.match}/> */}
               
                <div>
                    <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image URL</th>
                            <th>Product Number</th>
                            <th>Save</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {
                            products.map(p=>{
                                return (<ProductForm product={p} key={p.id}/>)
                            })
                        }
                    </tbody>    
                    </table>
                </div>
            </div>
        )
    }
}  

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
