import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SET_PRODUCTS = "SET_PRODUCTS";

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
});

const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state
  }
};

const SET_LINEITEMS = "SET_LINEITEMS";

const setLineItems = items => ({
  type: SET_LINEITEMS,
  items
});

const lineItems = (state = [], action) => {
  switch (action.type) {
    case SET_LINEITEMS:
      return action.items;
    default:
      return state;
  }
};

export const fetchProducts = () => dispatch => {
  return axios.get('api/products/')
    .then(products => dispatch(setProducts(products.data)))
};


const addProduct = product => dispatch => {
  return axios.post('/api/products/', product)
    .then(() => dispatch(fetchProducts()))
};

const delProduct = id => dispatch => {
  return axios.delete(`/api/product/${id}`)
    .then(() => dispatch(fetchProducts()))
};


const fetchLineItems = () => dispatch => {
  return axios.get('lineItem route')
    .then(items => dispatch(setLineItems(items)))
};


const addLineItem = product => dispatch => {
  return axios.post('lineItem route', product)
    .then(() => dispatch(fetchLineItems()))
};

const delLineItem = id => dispatch => {
  return axios.delete('lineItem route', id)
    .then(() => dispatch(fetchLineItems()))
};

const reducer = combineReducers({
  products,
  lineItems
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

