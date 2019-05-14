import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from './store/product';
import { fetchCategories } from './store/category';
import ProductForm from './ProductForm';

class ManageProduct extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchCategories();
    }
    render(){
        const history = this.props.history;
        const products = this.props.products;
        return(
            <div>
                {/* <Pager history={history} match ={this.props.match}/> */}
                <h1>Manage All Products</h1>
                {/* <Search history={history} match={this.props.match}/> */}
                <Link to='/manageProduct/addCategory' className='btn btn-primary'>Add Category</Link>
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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {
                            products.map(p=>{
                                return (<ProductForm product={p} history={this.props.history} categories={this.props.categories} key={p.id}/>)
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
        products: state.products,
        categories: state.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        fetchCategories: () => dispatch(fetchCategories())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
