// src/pages/HomeUser.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeUser = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách sản phẩm từ API
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
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Điều hướng đến trang thanh toán hoặc trang giỏ hàng
    navigate("/cart");
  };

  return (
    <div>
      <h2 className="text-3xl text-center my-5">Trang Chủ - Người Dùng</h2>
      <div className="grid grid-cols-3 gap-4">
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

      <div className="mt-5 flex justify-between">
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
