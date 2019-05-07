import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getOrderByUser } from './store/order';

class Order extends Component {
    constructor(props){
        super(props)
        this.state = {
            order: []
        }
    }

    componentDidMount(){
        console.log('this.props.user.id: ', this.props.user.id)
        if(this.props.user.id){
            this.props.getOrderByUser(this.props.user.id)
            .then(orders => {
                console.log(orders)
                this.setState({order: orders.order})
            })
        }
    }
    // componentDidUpdate(prevProps){
    //     if(JSON.stringify(prevProps.order) !== JSON.stringify(this.props.order)){
    //         if(this.props.user.id){
    //                 this.props.getOrderByUser(this.props.user.id)
    //                 .then(orders => {
    //                     console.log(orders)
    //                     this.setState({order: orders.order})
    //                 })
    //             }
    //     }
    // }
        
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
        user: state.user,
        order: state.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderByUser: (userId) => dispatch(getOrderByUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);