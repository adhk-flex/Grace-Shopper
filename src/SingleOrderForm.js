import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder, getOrderById, getSingleOrderItemsUsers } from './store/order';
import { fetchLineItemsByOrder } from './store/lineitem';
import Errors from './Errors';

class SingleOrder extends Component {
    constructor(){
        super();
        this.state = {
            status: '',
            errors: []
        };
    }
    
    componentDidMount() {
        this.props.getSingleOrderItemsUsers(this.props.user.id, this.props.match.params.orderId)
            .then(response => response.data)
            .then(() => this.setState({ status: this.props.order.status, errors: [] }))
            .catch(e => console.log(e.message))
    }

    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.props.getSingleOrderItemsUsers(this.props.user.id, this.props.match.params.orderId)
                .then(response => response.data)
                .then(() => this.setState({ status: this.props.order.status, errors: [] }))
                .catch(e => console.log(e))
        }
    }

    handleChange = evt => {
        this.setState({ status: evt.target.value });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.updateOrder(this.props.order.id, { orderNumber: this.props.order.orderNumber, status: this.state.status })
            .catch(e => this.setState({ errors: e.response.data.errors }));
    };

    render() {
        const { order } = this.props;
        const created = new Date(order.createdAt);
        const updated = new Date(order.updatedAt);
        if(order){
            return (
                <div>
                    <ul className='list-group'>
                        <li className='list-group-item'>Order Number: {order.orderNumber}</li>
                        {
                            order.user ? <li className='list-group-item'>Customer: {order.user.firstName} {order.user.lastName}</li> : null
                        }
                        <li className='list-group-item'>Order Number: {order.orderNumber}</li>
                        <li className='list-group-item'>Order Date: {created.getFullYear()}-{created.getMonth() + 1}-{created.getDate()}</li>
                        <li className='list-group-item'>Last Updated: {updated.getFullYear()}-{updated.getMonth() + 1}-{updated.getDate()}</li>
                        <li className='list-group-item'> Line Items
                            <ul className='list-group'>
                                {
                                    this.props.order.lineItems ? this.props.order.lineItems.map(item => <li key={item.id} className='list-group-item'>{item.productNumber}</li>) : ''
                                }
                            </ul>
                        </li>
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <select value={this.state.status} onChange={this.handleChange}>
                            <option value="created">Created</option>
                            <option value="processing">Processing</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="closed">Closed</option>
                        </select>
                        <button type="submit" className="btn btn-primary">submit</button>
                    </form>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    order: state.order,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    getSingleOrderItemsUsers: (userId, orderId) => dispatch(getSingleOrderItemsUsers(userId, orderId)),
    updateOrder: (id, data) => dispatch(updateOrder(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
