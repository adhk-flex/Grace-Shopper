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

export const postCreditCard = (userId, cardInfo)=> dispatch => {
  console.log('cardInfo: ', cardInfo)
  return axios.post(`/api/creditcards/user/${userId}`, cardInfo)
    .then(() => console.log("posted"))  
  // .then(() => dispatch(getCreditCard(userId)))
}
