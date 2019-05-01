import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SET_PRODUCTS = 'SET_PRODUCTS';


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

const SET_LINEITEMS = 'SET_LINEITEMS';

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

const SET_USER = 'SET_USER';

const setUser = user => ({
  type: SET_USER,
  user
});

const user = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const SET_CART = 'SET_CART';

const setCart = cart => ({
  type: SET_CART,
  cart
});

const cart = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
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


const fetchLineItems = cartId => dispatch => {
  return axios.get('lineItem route', cartId)
    .then(items => dispatch(setLineItems(items.data)))
};


const addLineItem = product => dispatch => {
  return axios.post('lineItem route', product)
    .then(() => dispatch(fetchLineItems()))
};

const delLineItem = id => dispatch => {
  return axios.delete('lineItem route', id)
    .then(() => dispatch(fetchLineItems()))
};

const login = formData => dispatch => {
  return axios.post('auth post route', formData)
    .then(user => dispatch(setUser(user.data)))
};
//the route that sets this user(formData) on session. 

const stayLogin = () => dispatch => {
  return axios.get('auth route for session')
    .then(user => dispatch(setUser(user.data)))
};
//this auth route return the current session's user. 

const logout = () => dispatch => {
  return axios.delete('auth route for delete the session')
    .then(() => dispatch(setUser({})))
};
//this auth route clear the user on session. 

const reducer = combineReducers({
  products,
  lineItems,
  user
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

