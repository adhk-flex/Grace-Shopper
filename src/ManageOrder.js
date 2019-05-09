import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getOrderByUser } from './store/order';
import { setUserCart } from './store/cart';

class ManageOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            order: []
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id){
            if(this.props.user.id){
                    this.props.getOrderByUser(this.props.user.id)
                    .then(orders => {
                        this.setState({order: orders.order})
                    })
                }
        }
    }
        
    render(){
        const {order} = this.state
        return (
            <div>
                <h3>Order Page</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Order Status</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.orderNumber}</td>
                                        <td>{order.status}</td>
                                        <td>{order.totalAmount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
} 

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user? state.user:false,
        order: state.order? state.order:false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderByUser: (userId) => dispatch(getOrderByUser(userId)),
        setUserCart: (userId) => dispatch(setUserCart(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);