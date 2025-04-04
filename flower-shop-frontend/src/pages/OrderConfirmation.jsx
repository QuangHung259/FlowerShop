// src/pages/OrderConfirmation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/home");
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold">Cảm ơn bạn đã đặt hàng!</h2>
      <p className="mt-4">
        Đơn hàng của bạn đã được xác nhận và đang được xử lý.
      </p>
      <button
        onClick={handleGoToHome}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default OrderConfirmation;
