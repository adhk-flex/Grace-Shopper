import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SET_PRODUCTS = "SET_PRODUCTS";

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
});

export const fetchProducts = () => dispatch => {
  return axios.get('api/products/')
    .then(products => dispatch(setProducts(products.data)))
}

const addProduct = product => dispatch => {
  return axios.post('/api/products/', product)
    .then(() => dispatch(fetchProducts()))
}

const delProduct = id => dispatch => {
  return axios.delete(`/api/product/${id}`)
    .then(() => dispatch(fetchProducts()))
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      state = action.products
      return state;
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

