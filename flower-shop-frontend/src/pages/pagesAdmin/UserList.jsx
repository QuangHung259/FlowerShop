import { useEffect, useState } from "react";
import axios from "axios";
import { deleteUser } from "../../api/userApi"; // thêm dòng này

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUsers(res.data);
  };

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "customer" : "admin";
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUsers(); // refresh lại danh sách
    } catch (error) {
      console.error("Lỗi đổi vai trò:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (userId) => {
    const confirm = window.confirm("Bạn chắc chắn muốn xoá người dùng này?");
    if (!confirm) return;

    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi xoá người dùng:", err);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Danh sách người dùng</h2>
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Họ tên</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 capitalize">{user.role}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => toggleRole(user._id, user.role)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {user.role === "admin"
                    ? "Chuyển thành Customer"
                    : "Chuyển thành Admin"}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
