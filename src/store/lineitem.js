import axios from 'axios';

const SET_LINEITEMS = 'SET_LINEITEMS';

const setLineItems = items => ({
  type: SET_LINEITEMS,
  items
});

export const lineItems = (state = [], action) => {
  switch (action.type) {
    case SET_LINEITEMS:
      return action.items;
    default:
      return state;
  }
};

export const fetchLineItems = cartId => dispatch => {
  console.log('cartId in fetchLineItems store/lineItem.js: ', cartId)
  if (cartId === null) {
    const items = JSON.parse(localStorage.getItem('lineItems'))
    dispatch(setLineItems(items))
  } else {
  return axios.get(`/api/lineitems/cart/${cartId}`)
    .then(items => dispatch(setLineItems(items.data)))
  }
};


export const addLineItem = (product, cartId) => dispatch => {
  return axios.post('/api/lineitems', product)
    .then(() => dispatch(fetchLineItems(cartId)))
};

export const delLineItem = (id, cartId) => dispatch => {
  return axios.delete(`/api/lineitems/${id}`)
    .then(() => dispatch(fetchLineItems(cartId)))
};

export const updateLineItem = (id, formData, cartId) => dispatch => {
  return axios.put(`/api/lineitems/${id}`, formData)
    .then(() => dispatch(fetchLineItems(cartId)))
}


