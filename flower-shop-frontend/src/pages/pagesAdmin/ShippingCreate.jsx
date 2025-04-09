import React, { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import { createShipping } from "../../api/shippingApi";
import { useNavigate } from "react-router-dom";

const ShippingCreate = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    orderId: "",
    carrier: "",
    trackingNumber: "",
    status: "pending",
    estimatedDelivery: "",
    actualDelivery: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getOrders();
        console.log("res from getOrders:", res); // 👈 Xem thử dữ liệu về
        setOrders(res.data); // 👈 res.data là 1 array các đơn hàng
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createShipping(formData);
      alert("Tạo thông tin vận chuyển thành công");
      navigate("/admin/shipping"); // 👈 quay lại trang danh sách
    } catch (error) {
      console.error("Lỗi khi tạo shipping:", error);
      alert("Tạo thất bại");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tạo thông tin vận chuyển</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Chọn đơn hàng:</label>
          <select
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">-- Chọn đơn hàng --</option>
            {orders.map((order) => (
              <option key={order._id} value={order._id}>
                {order._id} - {order.status} - {order.totalAmount}đ
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Hãng vận chuyển:</label>
          <input
            type="text"
            name="carrier"
            value={formData.carrier}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label>Mã theo dõi:</label>
          <input
            type="text"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Trạng thái:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div>
          <label>Ngày giao dự kiến:</label>
          <input
            type="date"
            name="estimatedDelivery"
            value={formData.estimatedDelivery}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Ngày giao thực tế:</label>
          <input
            type="date"
            name="actualDelivery"
            value={formData.actualDelivery}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tạo
        </button>
      </form>
    </div>
  );
};

export default ShippingCreate;
