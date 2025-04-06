// src/pages/HomeUser.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeUser = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const cartFromStorage = localStorage.getItem("cart");
    try {
      return cartFromStorage ? JSON.parse(cartFromStorage) : [];
    } catch (error) {
      console.error("Lỗi khi parse cart từ localStorage:", error);
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    // Kiểm tra nếu storedUser không phải là null và không phải là chuỗi "undefined"
    if (storedUser && storedUser !== "undefined") {
      return JSON.parse(storedUser);
    } else {
      return null; // Nếu không có user hoặc giá trị là "undefined", trả về null
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
      navigate("/login");
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      {/* Thanh điều hướng trên cùng */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
        <h2 className="text-2xl font-bold">Trang Chủ - Người Dùng</h2>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>
              👋 Chào, <strong>{user.fullName}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-xl font-semibold">{product.price} VNĐ</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>

      {/* Nút xem giỏ hàng */}
      <div className="mt-5 px-6">
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Xem Giỏ Hàng ({cart.length} sản phẩm)
        </button>
      </div>
    </div>
  );
};

export default HomeUser;
