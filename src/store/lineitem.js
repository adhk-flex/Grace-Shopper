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
    console.log('items in fetchLineItems in store: ', items)
    return Promise.resolve(dispatch(setLineItems(items)))
  } 
  else {
    return axios.get(`/api/lineitems/cart/${cartId}`)
      .then(items => dispatch(setLineItems(items.data)))
  }
};

const cleanLineItems = () => dispatch => {
  return Promise.resolve(dispatch(setLineItems([])))
}


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

export const convertLineItem = (orderId) => dispatch => {
  console.log('in convertLineItem')
  let items = JSON.parse(localStorage.getItem('lineItems'))  
  if (!items){
    items = []
    console.log('items in convert', items)
  }
  let itemsFromDB = []
  items.forEach((item)=>{
    axios.post(`/api/lineitems/${orderId}`, item)
    .then((item)=>itemsFromDB.push(item.data))
    .catch((error)=>console.log(error))
  })
  localStorage.setItem('lineItems', '[]');
  console.log('converted all line items')
  return Promise.resolve(dispatch(setLineItems(itemsFromDB)))
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
  console.log('item pass in store is: ', item)
  if(item.clean){
    return Promise.resolve(dispatch(cleanLineItems()))
  }
  if (item.cartId === null || undefined) {
    let items = JSON.parse(localStorage.getItem('lineItems'))
    console.log('items after localStorage is: ', items)
    if(!items){
      items = []
    } 
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
