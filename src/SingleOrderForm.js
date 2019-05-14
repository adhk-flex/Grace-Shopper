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
        if(order){
            return (
                <div>
                    <div>{order.orderNumber}</div>
                    {order.user ? <div>{order.user.firstName} {order.user.lastName}</div> : ''}
                    <form onSubmit={this.handleSubmit}>
                        <select value={this.state.status} onChange={this.handleChange}>
                            <option value="created">Created</option>
                            <option value="processing">Processing</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="closed">Closed</option>
                        </select>
                        <button type="submit" className="btn btn-primary">submit</button>
                    </form>
                    <ul>
                        {
                            this.props.order.lineItems ? this.props.order.lineItems.map(item => <li key={item.id}>{item.productNumber}</li>) : ''
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
    order: state.order,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    getSingleOrderItemsUsers: (userId, orderId) => dispatch(getSingleOrderItemsUsers(userId, orderId)),
    updateOrder: (id, data) => dispatch(updateOrder(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
