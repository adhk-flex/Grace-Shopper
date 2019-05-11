import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getOrderByUser } from './store/order';
import { setUserCart } from './store/cart';

class Order extends Component {

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps)!==JSON.stringify(this.props)){
            if(this.props.user.id){
                    this.props.getOrderByUser(this.props.user.id)
                }
        }
    }
        
    render(){
        const {order} = this.props
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
