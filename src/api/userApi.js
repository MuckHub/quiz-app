import { axios } from './axios';

export const getUserData = (email) => {
  return axios.get(`/users/?email=${email}`);
};

export const updateUserData = (id, data) => {
  return axios.put(`/users/${id}`, data);
};
