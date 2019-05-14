import axios from 'axios';
import {setUserCart} from './cart';

const SET_USER = 'SET_USER';
const SET_ALLUSERS = 'SET_ALLUSERS';

const setUser = user => ({
  type: SET_USER,
  user
});

const setAllUsers = users => ({
  type: SET_ALLUSERS,
  users
})

export const user = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export const allUsers = (state = [], action) => {
  switch (action.type) {
    case SET_ALLUSERS:
      return action.users;
    default: 
      return state;
  }
};

export const getAllUsers = () => dispatch => {
  return axios.get('/auth/users')
    .then(users => dispatch(setAllUsers(users.data)))
}

export const updateUser = user => dispatch => {
  console.log('upate in store', user)
  return axios.put(`/auth/${user.id}`, user)
    .then(() => dispatch(getAllUsers()))
    .then(() => console.log('update in store finished'))
}

export const deleteUser = userId => dispatch => {
  console.log('store deleting', userId)
  return axios.delete(`/auth/${userId}`)
    .then(() => dispatch(getAllUsers()))
}

export const login = user => dispatch => {
  return axios.put('/auth/login', user)
    .then(user => Promise.all(
        [
          dispatch(setUser(user.data)), 
          dispatch(setUserCart(user.data.id))
        ]
        )
      )
};
//login an existing user

export const loginNewUser = newUser => dispatch => {
  return axios.post('/auth/login', newUser)
    .then(user => Promise.all(
      [
        dispatch(setUser(user.data)), 
        dispatch(setUserCart(user.data.id))
      ]
      ))
}
//this login a new created User right after creating the user. 

export const sessionLogin = () => dispatch => {
  return axios.get('/auth/session')
    .then(user => {
      console.log('in the store user.js ', user)
      return Promise.all(
      [
        dispatch(setUser(user.data)), 
        dispatch(setUserCart(user.data.id))
      ]
      )})
};
//this auth route return the current session's user. 

export const logout = () => dispatch => {
  return axios.delete('/auth/logout')
    .then(() => dispatch(setUser({})))
};
//this auth route clear the user on session. 

