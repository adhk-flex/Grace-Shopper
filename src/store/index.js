import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {products} from './product';
import {categories} from './category';
import {lineItems} from './lineitem';
import {user} from './user';
import {cart} from './cart';
import {order} from './order';
import {address} from './address';
import {creditCard} from './creditcards';

const reducer = combineReducers({
  categories,
  products,
  lineItems,
  user,
  cart,
  order,
  address,
  creditCard
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
