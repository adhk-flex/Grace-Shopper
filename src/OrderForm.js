import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from './store/order';
import Errors from './Errors';

class OrderForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderNumber: this.props.order&&this.props.order.orderNumber || '',
            status: this.props.order&&this.props.order.status || '',
            totalAmount: this.props.order&&this.props.order.totalAmount || 0,
            id: this.props.order&&this.props.order.id || null,
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange=(ev)=>{
        this.setState({[ev.target.name]: ev.target.value})
    }

    handleSubmit=(ev)=>{
        ev.preventDefault();
        let o = this.state;
        let final = {   
            orderNumber: o.orderNumber,
            totalAmount: o.totalAmount*1,
            status: o.status
        }
        this.props.updateOrder(o.id, final)
        .then(()=>this.setState({...this.state, errors: []}))
        .catch(e=>this.setState({...this.state, errors: e.response.data.errors}));
    }
   
    render(){
        const { handleChange, handleSubmit } = this;
        let o = this.state;
        return(
        
        <tr key={o.id}>
            <td> <input type='text' onChange={this.handleChange} name='orderNumber' value={o.orderNumber}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='totalAmount' value={o.totalAmount}/> </td>
            <td> <input type='text' onChange={this.handleChange} name='status' value={o.status}/> </td>
            <td> <button className='btn btn-primary' type='submit' onClick={this.handleSubmit}/></td>
            <td> <Errors errors={this.state.errors} /></td>
        </tr>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateOrder: (id, order) => dispatch(updateOrder(id, order))
    }
}
export default connect(null, mapDispatchToProps)(OrderForm);
