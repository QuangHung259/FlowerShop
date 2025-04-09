import axios from "./axiosInstance";

const orderApi = {
  getOrders: () => axios.get("/orders"),
};

export default orderApi;
