import { useEffect, useState } from "react";
import { api } from "../services/api"; // Import API

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) =>
        alert(
          "Lỗi tải danh sách người dùng: " + err.response?.data?.message ||
            "Lỗi không xác định"
        )
      );
  }, []);

  return (
    <div className="container">
      <h2>Danh sách Người dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.fullName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
