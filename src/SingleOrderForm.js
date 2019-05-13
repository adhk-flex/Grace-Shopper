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
            console.log("UPDATE PROPS", this.props.user)
            this.props.getSingleOrderItemsUsers(this.props.user.id, this.props.match.params.orderId)
                .then(response => response.data)
                .then(() => this.setState({ status: this.props.order.status, errors: [] }))
                .catch(e => console.log(e))
        }
    }

    render() {
        const { order } = this.props;
        if(order){
            return (
                <div>
                    <div>{order.orderNumber}</div>
                    {order.user ? <div>{order.user.firstName} {order.user.lastName}</div> : ''}
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
