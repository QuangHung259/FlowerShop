// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCart(storedCart);
  }, [userId]);

  const handlePlaceOrder = async () => {
    if (!user || !user.token) {
      alert("Bạn cần đăng nhập để đặt hàng.");
      return;
    }

    if (!shippingAddress.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống.");
      return;
    }

    const orderData = {
      products: cart.map((product) => ({
        product: product._id,
        quantity: 1, // sau này có thể lấy từ product.quantity nếu bạn lưu
      })),
      totalAmount: cart.reduce((acc, item) => acc + item.price, 0),
      shippingAddress,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Tạo đơn hàng thất bại");
      }

      const data = await response.json();
      console.log("Đơn hàng đã được tạo:", data);

      localStorage.removeItem(`cart_${userId}`);
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error.message);
      alert("Đặt hàng thất bại. Vui lòng thử lại sau.");
    }
  };

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
        <div></div>
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
