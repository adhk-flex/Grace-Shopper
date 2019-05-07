import axios from 'axios';
import {setUserCart} from './cart';

const SET_USER = 'SET_USER';

const setUser = user => ({
  type: SET_USER,
  user
});

export const user = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

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
    .then(user => Promise.all(
      [
        dispatch(setUser(user.data)), 
        dispatch(setUserCart(user.data.id))
      ]
      ))
};
//this auth route return the current session's user. 

export const logout = () => dispatch => {
  return axios.delete('/auth/logout')
    .then(() => dispatch(setUser({})))
};
//this auth route clear the user on session. 

