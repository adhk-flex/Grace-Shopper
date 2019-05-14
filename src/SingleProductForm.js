import React, { Component } from 'react';
import { connect } from 'react-redux';
import Errors from './Errors';
import { updateProduct, delProduct, delProductCategory } from './store/product';
import { getProductCats } from './store/category'; 

class SingleProductForm extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
            imgUrl: '',
            productNumber:  '',
            categories: [],
            id: null,
            errors: []
        };
    }

    load = () => {
        if(this.props.products){
            const product = this.props.products.find(_product => _product.id === this.props.match.params.productId);
            if(product){
                this.setState({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    description: product.description,
                    imgUrl: product.imgUrl,
                    productNumber: product.productNumber,
                    id: product.id,
                    errors:[]
                });
                getProductCats(product.id)
                        .then(categories => this.setState({ categories }))
                        .catch(e => e.response.data.errors);
            }
        }
    };

    componentDidMount() {
        this.load();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevProps.products) !== JSON.stringify(this.props.products) || JSON.stringify(prevState.categories) !== JSON.stringify(this.state.categories)){
            this.load();
        }
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value }, () => console.log(this.state));
    };

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.updateProduct(this.state.id, this.state)
            .then(() => this.props.history.push('/manageProduct'))
            .catch(e => this.setState({ errors: e.response.data.errors }));
    };

    handleDeleteProduct = evt => {
        evt.preventDefault()
        this.props.delProduct(this.state.id)
        .catch(e=>this.setState({...this.state, errors: e.response.data.errors}));
    }

    handleDeleteCategory = (id) => {
        delProductCategory(this.state.id, id)
            .then(categories =>this.setState({ categories, errors: [] }))
            .catch(e=>this.setState({ ...this.state, errors: e.response.data.errors }));
    }

    render() {
        const product = this.state;
        if(product.productNumber){
            return (
                <div className='container'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' className='form-control' onChange={this.handleChange} name='name' value={product.name}/>
                        <label htmlFor='quantity'>Quantity: </label>
                        <input type='text' className='form-control' onChange={this.handleChange} name='quantity' value={product.quantity}/>
                        <label htmlFor='price'>Price: </label>
                        <input type='text' className='form-control' onChange={this.handleChange} name='price' value={product.price}/>
                        <label htmlFor='description'>Description: </label>
                        <input type='text' className='form-control' onChange={this.handleChange} name='description' value={product.description}/>
                        <label htmlFor='imgUrl'>Image URL: </label>
                        <input type='text' className='form-control' onChange={this.handleChange} name='imgUrl' value={product.imgUrl}/>
                        <label htmlFor='productNumber'>ProductNumber: </label>
                        <input type='text' className='form-control' onChange={this.handleChange} name='productNumber' value={product.productNumber}/>
                        <button className='btn btn-primary' type='submit'>Update</button>
                        <button className='btn btn-info' onClick={() => this.props.history.push('/manageProduct')}>Cancel</button>
                        <button className='btn btn-danger' onClick={this.handleDeleteProduct}>Delete</button>
                    </form>
                    Categories
                    <ul className='list-group'>
                        {
                            Array.isArray(this.state.categories) ? this.state.categories.map(category => <li 
                                    key={category.id} 
                                    className='list-group-item'
                                    >{category.name} <button className='btn btn-danger' onClick={() => this.handleDeleteCategory(category.id)}></button>
                                </li>) : null
                        }
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    products: state.products,
    allCategories: state.categories
});

const mapDispatchToProps = dispatch => ({
    updateProduct: (id, data) => dispatch(updateProduct(id, data)),
    delProduct: id => dispatch(delProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductForm);
