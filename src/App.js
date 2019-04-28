import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home'; 
import ProductList from './ProductList';
import Product from './Product';
import Cart from './Cart'

class App extends Component{
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <Router>
                <Route path = '/' component={Nav}/>
                <Switch>
                    <Route exact path = '/home' component={Home}/>
                    <Route exact path = '/productList' component={ProductList}/>
                    <Route exact path = '/product/:id' component={Product}/>
                    <Route exact path = '/cart' component={Cart}/>
                </Switch>
            </Router>
        )
    }
}

export default App;