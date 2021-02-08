import { axios } from './axios';

export const addRating = async (id, data, email, value) => {
  const newData = Object.assign({}, data);
  newData.rating.push({ user: email, rating: value });
  axios.put(`/packs/${id}`, newData);
};
