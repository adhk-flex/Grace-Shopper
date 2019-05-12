import axios from 'axios';

const SET_ADDRESS = 'SET_ADDRESS';

const setAddress = address => ({
  type: SET_ADDRESS,
  address
});

export const address = (state = [], action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return action.address;
    default:
      return state;
  }
};

export const userAddress = (userId, type) => dispatch => {
  return axios.get(`/api/addresses/${type}/user/${userId}`)
    .then(add => dispatch(setAddress(add.data)))
};

export const postAddress = (dataForm, userId, type) => dispatch => {
  console.log('store', dataForm,'user', userId)
  if (userId === undefined) {
    localStorage.setItem(type, JSON.stringify(dataForm))
    return new Promise(() => dispatch(setAddress(dataForm)))
  } else {
    return axios.post(`/api/addresses/${type}/user/${userId}`, dataForm)
      .then(() => dispatch(setAddress(userId, type)))
  }
};
