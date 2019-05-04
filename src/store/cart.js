import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = cart => ({
  type: SET_CART,
  cart
});

export const cart = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
};

export const setUserCart = userId => dispatch => {
  return axios.get(`/api/carts/user/${userId}`)
    .then(({data}) => dispatch(setCart(data)))
}


