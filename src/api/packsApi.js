import { axios } from './axios';

export const getAllPacks = () => {
  return axios.get('/packs');
};

export const getUserPacks = (email) => {
  return axios.get(`/users/?email=${email}`);
};
