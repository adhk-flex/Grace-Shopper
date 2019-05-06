import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
});

export const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state
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
  return axios.delete(`/api/products/${id}`)
    .then(() => dispatch(fetchProducts()))
};