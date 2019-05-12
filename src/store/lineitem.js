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
  if (cartId === undefined) {
    const items = JSON.parse(localStorage.getItem('lineItems'))
    return Promise.resolve(dispatch(setLineItems(items)))
  } else {
  return axios.get(`/api/lineitems/cart/${cartId}`)
    .then(items => dispatch(setLineItems(items.data)))
  }
};


export const addLineItem = (item) => dispatch => {
  if (item.cartId === undefined){
    let items = JSON.parse(localStorage.getItem('lineItems'))  
    if (!items){
      items = []
    }
    items.push(item)
    localStorage.setItem('lineItems', JSON.stringify(items));
    return Promise.resolve(dispatch(fetchLineItems()))
  }
  else {
    return axios.post('/api/lineitems', item)
      .then(() => dispatch(fetchLineItems(item.cartId)))
  }
};

export const delLineItem = (item) => dispatch => {
  if (item.cartId === undefined){
    let items = JSON.parse(localStorage.getItem('lineItems'))  
    localStorage.setItem('lineItems', JSON.stringify(items.filter(i => i.productId !== item.productId)))
    return Promise.resolve(dispatch(fetchLineItems()))
  }
  else {
    return axios.delete(`/api/lineitems/${item.id}`)
    .then(() => dispatch(fetchLineItems(item.cartId)))
  }
};

export const updateLineItem = (item) => dispatch => {
  if (item.cartId === undefined) {
    let items = JSON.parse(localStorage.getItem('lineItems'))
    let newitems = items.filter(i => i.productId !== item.productId)
    if (!newitems) {
      newitems = []
    }
    newitems.push(item)
    localStorage.setItem('lineItems', JSON.stringify(newitems))
    return Promise.resolve(dispatch(fetchLineItems()))
  }
  else {
    const {id, cartId} = item
    return axios.put(`/api/lineitems/${id}`, item)
      .then(() => dispatch(fetchLineItems(cartId)))
  }
}
