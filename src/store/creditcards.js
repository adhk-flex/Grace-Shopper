import axios from 'axios';

const SET_CREDITCARD = 'SET_CREDITCARD';

const setCreditCard = creditCard => ({
  type: SET_CREDITCARD,
  creditCard
});

export const creditCard = (state = [], action) => {
  switch (action.type) {
    case SET_CREDITCARD:
      return action.creditCard;
    default:
      return state;
  }
};

const getCreditCard = userId => dispatch => {
  return axios.get(`/api/creditcards/user/${userId}`)
    .then(card => dispatch(setCreditCard(card.data)))
}

const postCreditCard = (userId, cardInfo)=> dispatch => {
  return axios.post(`/api/creditcards/user/${userId}`, cardInfo)
    .then(() => dispatch(getCreditCard(userId)))
}
