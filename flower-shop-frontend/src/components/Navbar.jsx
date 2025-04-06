// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout(); // gọi lại hàm cha để cập nhật trạng thái
    navigate("/login");
  };

  return (
    <nav className="bg-pink-200 p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-pink-700">
        <Link to="/home">FlowerShop 🌸</Link>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="px-2 py-1 rounded border"
        />

        {!user ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-semibold">
              Xin chào, {user.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
