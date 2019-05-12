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
            firstName: this.props.order&&this.props.order.user.firstName || '',
            lastName: this.props.order&&this.props.order.user.lastName || '',
            createdDate: this.props.order&& new Date(this.props.order.createdAt) || '',
            lastUpdated: this.props.order&& new Date(this.props.order.updatedAt) || '',
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
            <td> {o.orderNumber} </td>
            <td> {o.firstName} </td>
            <td> {o.lastName} </td>
            <td> {o.totalAmount} </td>
            <td> <select onChange={this.handleChange} name='status' value={o.status}>
                    <option value="created">Created</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="closed">Closed</option>
                </select> 
            </td>
            <td> {o.createdDate.getFullYear()}-{(o.createdDate.getMonth() + 1)}-{o.createdDate.getDate()}  {o.createdDate.getHours()}:{o.createdDate.getMinutes()}:{o.createdDate.getSeconds()} </td>
            <td> {o.lastUpdated.getFullYear()}-{(o.lastUpdated.getMonth() + 1)}-{o.lastUpdated.getDate()}  {o.lastUpdated.getHours()}:{o.lastUpdated.getMinutes()}:{o.lastUpdated.getSeconds()} </td>
            <td> <button className='btn btn-primary' type='submit' onClick={this.handleSubmit}/></td>
            <td> <Errors errors={this.state.errors} /></td>
        </tr>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return {
        updateOrder: (id, order) => dispatch(updateOrder(id, order))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
