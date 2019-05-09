import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home'; 
import ProductList from './ProductList';
import Product from './Product';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm'
import Order from './order'
import { fetchProducts } from './store/product';
import { sessionLogin } from './store/user';
import { connect } from 'react-redux';
import Login from './login';


class App extends Component{
    
    componentDidMount() {
        this.props.fetchProducts()
        this.props.sessionLogin()
    }

    render(){
        let isLogin = this.props.isLogin
        if(isLogin){
            console.log('we have a user')
        }else{
            console.log('user is not login')
        }
        return(
            <Router>
                <Route path = '/' render={(({location}) => Nav(isLogin, {location}))}/>
                <Switch>
                    <Route exact path = '/home' component={Home}/>
                    <Route exact path = '/login' component={Login}/>
                    <Route exact path = '/signup' component={Login}/>
                    <Route exact path = '/logout' component={Login}/>
                    <Route exact path = '/productList' component={ProductList}/>
                    <Route exact path = '/productList/search/:srchVal' component={ProductList} />
                    <Route exact path = '/productList/category/:catId' component={ProductList} />
                    <Route exact path = '/productList/category/:catId/:srchVal' component={ProductList} />
                    <Route exact path = '/product/:id' component={Product}/>
                    <Route exact path = '/cart' component={Cart}/>
                    <Route exact path = '/checkout' component={CheckoutForm}/>
                    <Route exact path = '/order' component={Order}/>
                    <Route component={ProductList}/>
                </Switch>
            </Router>
        )
    }
}

// may need modify here
const mapStateToProps = ({user}) => {
    return {
        isLogin: (user && user.id)?true:false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        sessionLogin: () => dispatch(sessionLogin())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
