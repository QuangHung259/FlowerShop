import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi lấy đơn hàng cá nhân:", err);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order._id} className="border p-3 rounded">
              <p>
                <strong>Mã đơn:</strong> {order._id.slice(-6)}
              </p>
              <p>
                <strong>Trạng thái:</strong> {order.status}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()}
                ₫
              </p>
              <p>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
