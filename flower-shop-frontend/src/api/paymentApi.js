// src/api/paymentApi.js
import axiosInstance from "./axiosInstance";

const paymentApi = {
  getAll: () => axiosInstance.get("/payments"),
  getByUser: (userId) => axiosInstance.get(`/payments/user/${userId}`),
};

export default paymentApi;
