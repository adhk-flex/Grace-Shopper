import React, { Component } from 'react';
import { connect } from 'react-redux';
import Errors from './Errors';
import { updateProduct, delProduct, delProductCategory, addProductCategory, addProduct } from './store/product';
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
            selectedAddCatId: '',
            id: null,
            errors: []
        };
    }

    load = () => {
        if(this.props.products){
            const product = this.props.products.find(_product => _product.id === this.props.match.params.productId);
            if(product){
                this.setState({
                    ...product,
                    errors:[]
                });
                getProductCats(product.id)
                        .then(categories => this.setState({ categories }))
                        .catch(e => this.setState({ errors: e.response.data.errors }));
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
        if (this.props.location.pathname.includes('single')){
            this.props.updateProduct(this.state.id, this.state)
                .then(() => this.props.history.push('/manageProduct'))
                .catch(e => this.setState({ errors: e.response.data.errors }));
        } else {
            this.props.addProduct({
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                quantity: this.state.quantity,
                imgUrl: this.state.imgUrl,
                productNumber: this.state.productNumber
            })
            .then(product =>{
                this.props.history.push(`/manageProduct/single/${product.data.id}`)
            })
        }
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

    addCategoryToProduct = () => {
        if(this.state.selectedAddCatId.length){
            addProductCategory(this.state.id, this.state.selectedAddCatId)
            .then(categories => this.setState({ categories, errors: [] }))
            .catch(e => this.setState({ errors: e.response.data.errors }));
        }
    }

    render() {
        const product = this.state;
        if(this.props.location.pathname.includes('single') && product.productNumber){
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
                    <label htmlFor='categories'>Categories</label>
                    <ul className='list-group'>
                        {
                            Array.isArray(this.state.categories) ? this.state.categories.map(category => <li 
                                    key={category.id} 
                                    className='list-group-item'
                                    >{category.name} <button className='btn btn-danger btn-sm' onClick={() => this.handleDeleteCategory(category.id)}>X</button>
                                </li>) : null
                        }
                    </ul>
                    <label htmlFor='addCategory'>Add Category</label>
                    <select className='form-control' value={this.state.selectedAddCatId} name='selectedAddCatId' onChange={this.handleChange}>
                        <option value=''>Select Category</option>
                        {
                            this.props.allCategories && Array.isArray(this.state.categories) ?
                                this.props.allCategories.filter(cat => !this.state.categories.map(_cat => _cat.id).includes(cat.id))
                                    .map(filteredCat => <option value={filteredCat.id} key={filteredCat.id}>{filteredCat.name}</option>)
                                : null
                        }
                    </select>
                    <button type="button" className='btn btn-primary' onClick={this.addCategoryToProduct}>Add Category</button>
                    <Errors errors={this.state.errors} />
                </div>
            );
        } else {
            if (this.props.location.pathname.includes('single')) return null;
            else return(
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
                        <button className='btn btn-primary' type='submit'>Save</button>
                        <button className='btn btn-info' onClick={() => this.props.history.push('/manageProduct')}>Cancel</button>
                    </form>
                </div>
            );
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
    addProduct: product => dispatch(addProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductForm);
