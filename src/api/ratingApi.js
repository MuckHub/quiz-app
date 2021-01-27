import { axios } from './axios';

export const addRating = (id, data) => {
  return axios.put(`/packs/${id}`, data);
};
