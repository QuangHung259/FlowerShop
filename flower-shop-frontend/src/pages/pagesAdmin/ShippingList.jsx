import React, { useEffect, useState } from "react";
import { getAllShipping, deleteShipping } from "../../api/shippingApi";
import { Link } from "react-router-dom";

const ShippingList = () => {
  const [shippings, setShippings] = useState([]);

  useEffect(() => {
    fetchShippings();
  }, []);

  const fetchShippings = async () => {
    try {
      const res = await getAllShipping();
      setShippings(res.data.shippings);
    } catch (err) {
      console.error("Lỗi khi load shipping:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa thật không?")) return;
    try {
      await deleteShipping(id);
      fetchShippings();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Thêm vận chuyển</h2>
        <Link to="/admin/shipping/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Tạo vận chuyển
          </button>
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-4">Danh sách vận chuyển</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Mã đơn</th>
            <th className="border p-2">Hãng vận chuyển</th>
            <th className="border p-2">Mã theo dõi</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Dự kiến giao</th>
            <th className="border p-2">Giao thực tế</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {shippings.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.order._id}</td>
              <td className="border p-2">{s.carrier}</td>
              <td className="border p-2">{s.trackingNumber}</td>
              <td className="border p-2">{s.status}</td>
              <td className="border p-2">
                {s.estimatedDelivery?.slice(0, 10)}
              </td>
              <td className="border p-2">
                {s.actualDelivery?.slice(0, 10) || "-"}
              </td>
              <td className="border p-2">
                {/* Xử lý phần sửa + xóa */}
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingList;
