import { axios } from './axios';

export const getAllPacks = () => {
  return axios.get('/packs');
};
