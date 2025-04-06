// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCart(storedCart);
    }
  }, [userId]);

  const handlePlaceOrder = () => {
    const orderData = {
      products: cart.map((product) => ({
        product: product._id,
        quantity: 1,
      })),
      totalAmount: cart.reduce((acc, item) => acc + item.price, 0),
      shippingAddress,
    };

    // TODO: Gửi API order ở đây

    localStorage.removeItem(`cart_${userId}`);
    navigate("/order-confirmation");
  };

  if (!userId) {
    return (
      <div className="text-center mt-10">
        <p>Vui lòng đăng nhập để thanh toán.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-center my-5">Thanh Toán</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="shippingAddress" className="block text-lg">
            Địa chỉ giao hàng
          </label>
          <textarea
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Nhập địa chỉ giao hàng..."
            required
          />
        </div>

        <div>
          <h3 className="text-xl font-bold">Chi tiết đơn hàng</h3>
          <div className="space-y-2">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{product.name}</span>
                <span>{product.price} VNĐ</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Đặt Hàng
          </button>
          <p className="font-bold">
            Tổng tiền: {cart.reduce((acc, item) => acc + item.price, 0)} VNĐ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
