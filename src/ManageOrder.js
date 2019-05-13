import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getOrderByUser, getOrdersWithUsers, getOrdersByStatus } from './store/order';
import OrderForm from './OrderForm';

class ManageOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            seletedStatus: 'all'
        }
    }

    load = () => {
        if(this.state.seletedStatus === 'all'){
            this.props.getOrdersWithUsers(this.props.user.id);
        } else {
            this.props.getOrdersByStatus(this.state.seletedStatus, this.props.user.id);
        }
    };

    handleChange = evt => {
        this.setState({ seletedStatus: evt.target.value }, () => {
            this.load();   
        });
    };

    componentDidMount(){
        if(this.props.user){
            this.load();
        }
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps)!==JSON.stringify(this.props)){
            if(this.props.user){
                this.load();
            }
        }
    }
        
    render(){
        const orders = this.props.orders;
        return (
            <div>
                <h3>Order Page</h3>
                <span>
                    Select Status
                    <select value={this.state.seletedStatus} onChange={this.handleChange} name="status">
                        <option value='all'>All</option>
                        <option value='created'>Created</option>
                        <option value='processing'>Processing</option>
                        <option value='cancelled'>Cancelled</option>
                        <option value='closed'>Closed</option>
                    </select>
                </span>
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
                                return (<OrderForm order={o} location={this.props.location} key={o.id}/>)
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
        orders: state.order? state.order:false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderByUser: (userId) => dispatch(getOrderByUser(userId)),
        getOrdersWithUsers: (userId) => dispatch(getOrdersWithUsers(userId)),
        getOrdersByStatus: (status, userId) => dispatch(getOrdersByStatus(status, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);