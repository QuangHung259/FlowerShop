//pages/pagesAdmin/OrderDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrder(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết đơn hàng:", err);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!order) return <p>Đang tải...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Chi tiết đơn hàng #{order._id.slice(-6)}
      </h2>

      <p>
        <strong>Khách hàng:</strong> {order.customerName}
      </p>
      <p>
        <strong>Email:</strong> {order.customerEmail}
      </p>
      <p>
        <strong>SĐT:</strong> {order.customerPhone}
      </p>
      <p>
        <strong>Địa chỉ giao hàng:</strong> {order.shippingAddress}
      </p>
      <p>
        <strong>Trạng thái:</strong> {order.status}
      </p>

      <h3 className="font-semibold mt-4">Danh sách sản phẩm:</h3>
      <ul className="list-disc pl-5">
        {order.products.map((item, idx) => (
          <li key={idx}>
            {item.product?.name} - SL: {item.quantity} - Giá:{" "}
            {item.product?.price?.toLocaleString()}₫
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold">
        Tổng tiền: {order.totalAmount.toLocaleString()}₫
      </p>
    </div>
  );
};

export default OrderDetail;
