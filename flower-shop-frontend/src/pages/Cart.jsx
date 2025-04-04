// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Chuyển hướng đến trang thanh toán hoặc thực hiện thanh toán
    navigate("/checkout");
  };

  return (
    <div>
      <h2 className="text-3xl text-center my-5">Giỏ Hàng</h2>
      {cart.length === 0 ? (
        <p className="text-center">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border p-4 rounded shadow-md"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <div>
                <h3>{product.name}</h3>
                <p>{product.price} VNĐ</p>
              </div>
              <button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-5 flex justify-between">
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Thanh Toán
          </button>
          <p className="font-bold">
            Tổng tiền: {cart.reduce((acc, item) => acc + item.price, 0)} VNĐ
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
