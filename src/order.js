import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getOrderByUser } from './store/order';

class Order extends Component {
    constructor(props){
        super(props)
        this.state = {
            orderNumber: '',
            status: '',
            totalAmount: '',
        }
    }

    componentDidMount(){
        console.log('this.props.user.id: ', this.props.user.id)
        if(this.props.user.id){
            this.props.getOrderByUser(this.props.user.id)
            .then(orders => this.setState(orders[0]))
        }
    }

    render(){
        const {orderNumber, status, totalAmount} = this.state
        return (
            <div>
                <h3>Order Page</h3>
                <span>The order number is: {orderNumber}</span>
                <br/>
                <span>The order status is: {status}</span>
                <br/>
                <span>The totalAmount is: {totalAmount}</span>
            </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderByUser: (userId) => dispatch(getOrderByUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);