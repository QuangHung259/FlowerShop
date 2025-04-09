import axios from "axios";
import { getToken } from "./auth"; // Nếu bạn đang dùng Bearer Token

const API_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => {
  const token = getToken();
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserRole = async (userId, newRole) => {
  const token = getToken();
  return await axios.put(
    `${API_URL}/${userId}/role`,
    { role: newRole },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteUser = async (userId) => {
  const token = getToken();
  return await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
