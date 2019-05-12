import axios from 'axios';

const SET_ORDER = 'SET_ORDER';

const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const order = (state = [], action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};

export const getOrderByUser = userId => dispatch => {
  console.log('reducer for order')
  return axios.get(`/api/orders/user/${userId}`)
    .then(orders => dispatch(setOrder(orders.data)))
};

const getOrderById = orderId => dispatch => {
  return axios.get(`/api/orders/${orderId}`)
    .then(order => dispatch(setOrder(order.data)))
};

export const getOrderbyStatus = status => dispatch => {
  return axios.get(`/api/orders/status/${status}`)
    .then(orders => dispatch(setOrder(orders.data)))
};

export const getOrdersWithUsers = () => dispatch => {
  return axios.get('/api/orders/include/users')
    .then(orders => dispatch(setOrder(orders.data)))
}

export const createOrder = (userId) => dispatch => {
  return axios.post(`/api/orders/user/${userId}`)
    .then(() => dispatch(getOrderByUser(userId)))
};

export const updateOrder = (orderId, formData, userId) => dispatch => {
  return axios.put(`/api/orders/${orderId}`, formData)
    .then(() => dispatch(getOrderByUser(userId)))
};

const deleteOrder = (orderId, userId) => dispatch => {
  return axios.delete(`/api/orders/${orderId}`)
    .then(() => dispatch(getOrderByUser(userId)))
};