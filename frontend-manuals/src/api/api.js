import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia a la URL de tu backend

export const loginUser = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const getManualsByCategory = async (manual_categorie_id, token) => {
  return axios.get(`${API_URL}/manuals-by-categorie`, {
    params: { manual_categorie_id },
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllCategories = async (token) => {
  return axios.get(`${API_URL}/manuals-categories`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};