import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {products} from './product';
import {categories} from './category';
import {lineItems} from './lineitem';
import {user} from './user';
import {cart} from './cart';
import {order} from './order';

const reducer = combineReducers({
  categories,
  products,
  lineItems,
  user,
  cart,
  order
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
