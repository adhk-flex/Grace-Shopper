import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder, getOrderById } from './store/order';
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

    }
}

const mapStateToProps = state => ({
    order: state.order
});

const mapDispatchToProps = dispatch => ({
    getOrderById: id => dispatch(getOrderById(id)),
    updateOrder: (id, data) => dispatch(updateOrder(id, data))
});

export default connect()
