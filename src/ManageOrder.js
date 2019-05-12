import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getOrderByUser } from './store/order';
import OrderForm from './OrderForm';

class ManageOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders: []
        }
    }

    componentDidMount(){
        if(this.props.user){
            this.props.getOrderByUser(this.props.user.id)
        }
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps)!==JSON.stringify(this.props)){
            if(this.props.user.id){
                this.props.getOrderByUser(this.props.user.id)
            }
        }
    }

    componentDidMount(){
        if(this.props.user.id){
            this.props.getOrderByUser(this.props.user.id)
        }
    }
        
    render(){
        const orders = this.props.orders;
        return (
            <div>
                <h3>Order Page</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Total Amount</th>
                            <th>Order Status</th>
                            <th>Order Date</th>
                            <th>Last Update Date</th>
                            <th>Save</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(o => {
                                return (<OrderForm order={o} key={o.id}/>)
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
        orders: state.order? state.order:false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderByUser: (userId) => dispatch(getOrderByUser(userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);