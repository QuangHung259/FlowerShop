import axios from "./axiosInstance";

export const getAllShipping = () => axios.get("/shipping");
export const getShippingByOrderId = (orderId) =>
  axios.get(`/shipping/order/${orderId}`);
export const createShipping = (data) => axios.post("/shipping", data);
export const updateShipping = (shippingId, data) =>
  axios.put(`/shipping/${shippingId}`, data);
export const deleteShipping = (shippingId) =>
  axios.delete(`/shipping/${shippingId}`);
