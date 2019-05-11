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
    return new Promise(() => dispatch(setLineItems(items)))
  } else {
  return axios.get(`/api/lineitems/cart/${cartId}`)
    .then(items => dispatch(setLineItems(items.data)))
  }
};


export const addLineItem = (product, cartId) => dispatch => {

  if(cartId === undefined){
    const items = JSON.parse(localStorage.getItem('lineItems'))  
    items.push(product)
    localStorage.setItem('lineItems', JSON.stringify(items));
    return new Promise(() => dispatch(fetchLineItems()))
  }
  else{
    return axios.post('/api/lineitems', product)
      .then(() => dispatch(fetchLineItems(cartId)))
  }
};

export const delLineItem = (id, cartId) => dispatch => {
  return axios.delete(`/api/lineitems/${id}`)
    .then(() => dispatch(fetchLineItems(cartId)))
};

export const updateLineItem = (id, formData, cartId) => dispatch => {
  if(cartId===undefined){
    const items = JSON.parse(localStorage.getItem('lineItems'))  
    let newItems = items.map(item=>{
      if(item.productId===product.productId){
        item.quantity=product.quantity+Number(item.quantity)
        console.log(item.quantity)
      }
      return item;
    })
    localStorage.setItem('lineItems', JSON.stringify(newItems))
    return new Promise(() => dispatch(fetchLineItems()))
  }
  else{
    return axios.put(`/api/lineitems/${id}`, formData)
    .then(() => dispatch(fetchLineItems(cartId)))
  }
}
