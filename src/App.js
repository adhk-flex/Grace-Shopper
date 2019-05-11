import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home'; 
import ProductList from './ProductList';
import ManageProduct from './ManageProduct';
import Product from './Product';
import Cart from './Cart';
import Order from './Order'
import ManageOrder from './ManageOrder';
import { fetchProducts } from './store/product';
import { sessionLogin } from './store/user';
import { fetchCategories } from './store/category';
import { fetchLineItems } from './store/lineitem';
import { connect } from 'react-redux';
import Login from './login';
import ShipAddress from './ShipAddress';
import CreditCard from './CreditCard';
import BillAddress from './BillAddress'

class App extends Component{
    
    componentDidMount() {
        this.props.fetchProducts();
        this.props.sessionLogin();
    }
    
    componentDidUpdate(prevProps){
        if (prevProps.cart.id !== this.props.cart.id) {
            this.props.fetchLineItems(this.props.cart.id)
        }
    }

    render(){
        let isLogin = this.props.isLogin
        if(isLogin){
            console.log('we have a user')
        }else{
            console.log('user is not login')
        }
        const {lineItems} = this.props
        return(
            <Router>
                <Route path = '/' render={(({location}) => Nav(isLogin, {location}, lineItems))}/>
                <Switch>
                    <Route exact path = '/home' component={Home}/>
                    <Route exact path = '/login' component={Login}/>
                    <Route exact path = '/signup' component={Login}/>
                    <Route exact path = '/logout' component={Login}/>
                    <Route exact path = '/productList/category/:catId/search/:srchVal' component={ProductList} />
                    <Route exact path = '/productList/category/:catId' component={ProductList} />
                    <Route exact path = '/productList/search/:srchVal/:pgIdx?' component={ProductList} />
                    <Route exact path = '/productList/:idx' component={ProductList}/>
                    <Route exact path = '/productList' component={ProductList}/>
                    <Route exact path = '/manageProduct' component={ManageProduct}/>
                    <Route exact path = '/product/:id' component={Product}/>
                    <Route exact path = '/cart' component={Cart}/>
                    <Route exact path = '/checkoutStep1' component={ShipAddress}/>
                    <Route exact path = '/checkoutStep2' component={CreditCard}/>
                    <Route exact path = '/checkoutStep3' component={BillAddress}/>
                    <Route exact path = '/order' component={Order}/>
                    <Route exact path = '/manageOrder' component={ManageOrder}/>
                    <Route component={ProductList}/>
                </Switch>
            </Router>
        )
    }
}

// may need modify here
const mapStateToProps = ({user, cart, lineItems}) => {
    return {
        isLogin: (user && user.id) ? user: false,
        cart: cart,
        lineItems: lineItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        sessionLogin: () => dispatch(sessionLogin()),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchLineItems: (cartId) => dispatch(fetchLineItems(cartId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
