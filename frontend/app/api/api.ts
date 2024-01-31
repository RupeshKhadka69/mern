// api.js

import axios from 'axios';
const API_URL = 'http://localhost:8000/api/user';
type userData = {
    name?: string,
    email: string,
    password: string 
}
export const registerUser = async (userData:userData) => {
  return axios.post(`${API_URL}/`, userData).then((response)=> response.data);
};

export const loginUser = async (credentials:userData) => {
  return axios.post(`${API_URL}/auth`, credentials);
};

export const getUserProfile = async () => {
  
  return axios.get(`${API_URL}/profile`);
};

export const logoutUser = async () => {
  return axios.post(`${API_URL}/logout`);
};
