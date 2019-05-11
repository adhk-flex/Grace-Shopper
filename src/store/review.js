import axios from 'axios';

const SET_REVIEWS = 'SET_REVIEWS';

const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews
});

export const reviews = (state = [], action) => {
  switch (action) {
    case SET_REVIEWS:
      return action.reviews;
    default:
      return state
  }
};

const fetchReviews = () => dispatch => {
  return axios.get('/api/reviews')
    .then(reviews => dispatch(setReviews(reviews.data)))
};

const getReviewsByUser = userId => dispatch => {
  return axios.get(`/api/reviews/${userId}`)
    .then(reviews => dispatch(setReviews(reviews.data)))
};

const getReviewsByProduct = productId => dispatch => {
  return axios.get(`/api/reviews/${productId}`)
    .then(reviews => dispatch(setReviews(reviews.data)))
};

export const postReview = (review, productId, userId) => dispatch => {
  return axios.post(`/api/reviews/${productId}/${userId}`, review)
    .then(() => dispatch(fetchReviews()))
};

