import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getCategories = () => axios.get(API_URL);

export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`);

export const createCategory = (data) => axios.post(API_URL, data, config);

export const updateCategory = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, config);

export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`, config);
