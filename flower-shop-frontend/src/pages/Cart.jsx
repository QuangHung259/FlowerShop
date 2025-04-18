// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userId) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

      const cartWithQuantity = storedCart.map((item) => ({
        ...item,
        quantity:
          typeof item.quantity === "number" && item.quantity > 0
            ? item.quantity
            : 1,
      }));
      setCart(cartWithQuantity);
    }
  }, [userId]);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  // hàm xử lý tăng giảm số lượng sản phẩm
  const changeQuantity = (productId, delta) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta), // Giới hạn >= 1
          }
        : item
    );
    updateLocalStorage(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    updateLocalStorage(updatedCart);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!userId) {
    return (
      <div className="text-center mt-10">
        <p>Vui lòng đăng nhập để xem giỏ hàng.</p>
      </div>
    );
  }

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
              <div className="flex item-center gap-2">
                <button
                  onClick={() => changeQuantity(product._id, -1)}
                  className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                >
                  −
                </button>
                <span>{product.quantity || 1}</span>
                <button
                  onClick={() => changeQuantity(product._id, 1)}
                  className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                >
                  +
                </button>
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
            Tổng tiền:{" "}
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}{" "}
            VNĐ
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
