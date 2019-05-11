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
  return axios.get('/api/products/')
    .then(products => dispatch(setProducts(products.data)))
};

export const fetchFilteredProducts = (srchVal, catId, pgIdx) => dispatch => {
  let url = `/api/products`;
  if (catId) url += `/category/${catId}`;
  if (srchVal) url += `/search/${srchVal}`;
  if (pgIdx) url += `/${pgIdx}`;
  return axios.get(url)
    .then(products => {
      return dispatch(setProducts(products.data))
    } )
};

export const getProductByPg = pgIdx => dispatch => {
  return axios.get(`/api/products/${pgIdx}`)
    .then(products => dispatch(setProducts(products.data)))
}

const addProduct = product => dispatch => {
  return axios.post('/api/products/', product)
    .then(() => dispatch(fetchProducts()))
};

export const updateProduct = (id, product) => dispatch => {
  console.log('in update product thunk')
  return axios.put(`/api/products/${id}`, product)
    .then((res)=>console.log(res))
    .then(() => dispatch(fetchProducts()))
};

export const delProduct = id => dispatch => {
  return axios.delete(`/api/products/${id}`)
    .then(() => dispatch(fetchProducts()))
};
