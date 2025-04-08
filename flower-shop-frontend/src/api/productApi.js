import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

// Luôn gắn token mới nhất vào mỗi request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllProducts = () => API.get("/");
export const getProductById = (id) => API.get(`/${id}`);
export const createProduct = (data) => API.post("/", data);
export const updateProduct = (id, data) => API.put(`/${id}`, data);
export const deleteProduct = (id) => API.delete(`/${id}`);
export const uploadImage = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Authorization sẽ được tự động thêm bởi interceptor ở trên
    },
  });
