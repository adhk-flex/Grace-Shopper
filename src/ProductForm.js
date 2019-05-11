import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, delProduct } from './store/product';
import Errors from './Errors';

class ProductForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: this.props.product&&this.props.product.name || '',
            price: this.props.product&&this.props.product.price || '',
            quantity: this.props.product&&this.props.product.quantity || '',
            description: this.props.product&&this.props.product.description || '',
            imgUrl: this.props.product&&this.props.product.imgUrl || '',
            productNumber: this.props.product&&this.props.product.productNumber || '',
            id: this.props.product&&this.props.product.id || null,
            errors: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange=(ev)=>{
        this.setState({[ev.target.name]: ev.target.value})
        //this.setState({...this.state, errors: []})
    }

    handleSubmit=(ev)=>{
        ev.preventDefault();
        let p = this.state;
        let final = {   
            name: p.name,
            price: p.price*1,
            quantity: p.quantity*1,
            description: p.description,
            imgUrl: p.imgUrl,
            productNumber: p.productNumber
        }
        this.props.updateProduct(p.id, final)
        .then(()=>this.setState({...this.state, errors: []}))
        .catch(e=>this.setState({...this.state, errors: e.response.data.errors}));
    }

    handleDelete(ev){
        ev.preventDefault()
        this.props.deleteProduct(this.state.id)
        .then(()=>this.setState({...this.state, errors: []}))
        .catch(e=>this.setState({...this.state, errors: e.response.data.errors}));
    }
   
    render(){
        const {handleChange, handleSubmit, handleDelete} = this;
        let p = this.state;
        return(
        
        <tr key={p.id}>
            <td> <input type='text' onChange={this.handleChange} name='name' value={p.name}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='quantity' value={p.quantity}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='price' value={p.price}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='description' value={p.description}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='imgUrl' value={p.imgUrl}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='productNumber' value={p.productNumber}/> </td>
            <td> <button className='btn btn-primary' type='submit' onClick={this.handleSubmit}/></td>
            <td> <button className='btn btn-danger' onClick={this.handleDelete}/></td>
            <td> <Errors errors={this.state.errors} /></td>
        </tr>
        
        
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProduct: (id, product) => dispatch(updateProduct(id, product)),
        deleteProduct: (id) => dispatch(delProduct(id))
    }
}
export default connect(null, mapDispatchToProps)(ProductForm);
