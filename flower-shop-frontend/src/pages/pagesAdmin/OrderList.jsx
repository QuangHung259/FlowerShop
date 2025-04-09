import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách đơn hàng:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn chắc chắn muốn xoá đơn hàng này?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.error("Lỗi xoá đơn hàng:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách đơn hàng</h2>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Mã đơn</th>
            <th className="border p-2">Khách hàng</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Tổng tiền</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="border p-2">{order._id.slice(-6)}</td>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">{order.customerEmail}</td>
              <td className="border p-2 text-right">
                {order.totalAmount.toLocaleString()}₫
              </td>
              <td className="border p-2 capitalize">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Chờ xác nhận</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đã giao cho đơn vị vận chuyển</option>
                  <option value="delivered">Đã giao hàng</option>
                  <option value="canceled">Đã huỷ</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </td>
              <td className="border p-2">
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Xem
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
