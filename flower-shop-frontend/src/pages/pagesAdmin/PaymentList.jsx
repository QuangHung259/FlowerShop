// src/pages/pagesAdmin/PaymentList.jsx
import React, { useEffect, useState } from "react";
import paymentApi from "../../api/paymentApi";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await paymentApi.getAll();
        setPayments(res.data.payments);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách thanh toán:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Danh sách thanh toán</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Người dùng</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Mã đơn hàng</th>
            <th className="border px-3 py-2">Số tiền</th>
            <th className="border px-3 py-2">Phương thức</th>
            <th className="border px-3 py-2">Trạng thái</th>
            <th className="border px-3 py-2">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id} className="text-center">
              <td className="border px-3 py-2">{index + 1}</td>
              <td className="border px-3 py-2">{payment.user?.fullName}</td>
              <td className="border px-3 py-2">{payment.user?.email}</td>
              <td className="border px-3 py-2">{payment.order?._id}</td>
              <td className="border px-3 py-2">
                {payment.amount.toLocaleString()} đ
              </td>
              <td className="border px-3 py-2">
                {payment.method.toUpperCase()}
              </td>
              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    payment.status === "completed"
                      ? "bg-green-500"
                      : payment.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="border px-3 py-2">
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
