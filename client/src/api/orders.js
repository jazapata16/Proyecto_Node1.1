import axios from "./axios";

export const getOrdersRequest = async () => axios.get("/orders");

export const getAdminOrdersRequest = async () => axios.get("/orders/admin");

export const createOrderRequest = async (order) => axios.post("/orders", order);

export const updateOrderRequest = async (order) =>
  axios.put(`/orders/${order._id}`, order);

  export const cancelOrderRequest = async (order) =>
  axios.put(`/orders/${order._id}`, order);

export const deleteOrderRequest = async (id) => axios.delete(`/orders/${id}`);

export const getOrderRequest = async (id) => axios.get(`/orders/${id}`);
