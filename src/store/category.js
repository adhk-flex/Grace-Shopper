import axios from 'axios';

const SET_CATEGORY = 'SET_CATEGORY';

const setCategory = category => ({
  type: SET_CATEGORY,
  category
});

export const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export const fetchCategories = () => dispatch => {
  return axios.get('/api/categories')
    .then(categories => dispatch(setCategory(categories.data)))
}

const getCategoriesWId = id => dispatch => {
  return axios.get(`/api/categories/${id}`)
    .then(categories => dispatch(setCategory(categories.data)))
}

const addCategory = category => dispatch => {
  return axios.post('/api/categories', category)
    .then(() => dispatch(fetchCategories()))
};

const delCategory = id => dispatch => {
  return axios.delete(`/api/categories/${id}`)
    .then(() => dispatch(fetchCategories()))
}
