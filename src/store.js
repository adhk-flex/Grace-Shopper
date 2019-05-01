import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_CATEGORY = 'SET_CATEGORY';

const setCategory = category => ({
  type: SET_CATEGORY,
  category
});

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

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

const fetchCategories = () => dispatch => {
  return axios.get('/api/categories')
    .then(categories => dispatch(setCategory(categories.data)))
}

const getCategoriesWId = id => dispatch => {
  return axios.get(`/api/categories/${id}`)
    .then(categories => dispatch(setCategory(categories.data)))
}

const addCategory = category => dispatch => {
  return axios.post('/api/categories', category)
    .then(() => dispatch(fetchCategories()))
};

const delCategory = id => dispatch => {
  return axios.delete(`/api/categories/${id}`)
    .then(() => dispatch(fetchCategories()))
}


export const fetchProducts = () => dispatch => {
  return axios.get('api/products/')
    .then(products => dispatch(setProducts(products.data)))
};


const addProduct = product => dispatch => {
  return axios.post('/api/products/', product)
    .then(() => dispatch(fetchProducts()))
};

const delProduct = id => dispatch => {
  return axios.delete(`/api/products/${id}`)
    .then(() => dispatch(fetchProducts()))
};


const fetchLineItems = cartId => dispatch => {
  return axios.get(`/api/lineitems/${cartId}`)
    .then(items => dispatch(setLineItems(items.data)))
};


const addLineItem = product => dispatch => {
  return axios.post('/api/lineitems', product)
    .then(() => dispatch(fetchLineItems()))
};

const delLineItem = id => dispatch => {
  return axios.delete(`/api/lineitems/${id}`)
    .then(() => dispatch(fetchLineItems()))
};

const login = formData => dispatch => {
  return axios.put('/auth/login', formData)
    .then(user => dispatch(setUser(user.data)))
};
//login an existing user

export const loginNewUser = newUser => dispatch => {
  return axios.post('/auth/login', newUser)
    .then(user => dispatch(setUser(user.data)))
}
//this login a new created User right after creating the user. 

const sessionLogin = () => dispatch => {
  return axios.get('/auth/session')
    .then(user => dispatch(setUser(user.data)))
};
//this auth route return the current session's user. 

const logout = () => dispatch => {
  return axios.delete('/auth/logout')
    .then(() => dispatch(setUser({})))
};
//this auth route clear the user on session. 

const reducer = combineReducers({
  categories,
  products,
  lineItems,
  user
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

