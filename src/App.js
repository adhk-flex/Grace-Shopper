import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home'; 
import ProductList from './ProductList';
import Product from './Product';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm'
import { fetchProducts } from './store/product';
import { sessionLogin } from './store/user';
import { connect } from 'react-redux';
import Login from './Login';


class App extends Component{
    
    componentDidMount() {
        this.props.fetchProducts()
        this.props.sessionLogin()
    }

    render(){
        if(this.props.isLogin){
            console.log('we have a user')
        }else{
            console.log('user is not login')
        }
        return(
            <Router>
                <Route path = '/' component={Nav}/>
                <Switch>
                    <Route exact path = '/home' component={Home}/>
                    <Route exact path = '/login' component={Login}/>
                    <Route exact path = '/signup' component={Login}/>
                    <Route exact path = '/logout' component={Login}/>
                    <Route exact path = '/productList' component={ProductList}/>
                    <Route exact path = '/product/:id' component={Product}/>
                    <Route exact path = '/cart' component={Cart}/>
                    <Route exact path = '/checkout' component={CheckoutForm}/>
                </Switch>
            </Router>
        )
    }
}

// may need modify here
const mapStateToProps = ({user}) => {
    return {
        isLogin: user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        sessionLogin: () => dispatch(sessionLogin())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);