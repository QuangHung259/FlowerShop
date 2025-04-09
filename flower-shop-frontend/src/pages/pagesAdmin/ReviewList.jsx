//pages/pagesAdmin/ReviewList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get("/api/reviews/all"); // API cần tạo
      setReviews(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách đánh giá:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      try {
        await axios.delete(`/api/reviews/${id}`);
        setReviews(reviews.filter((review) => review._id !== id));
      } catch (err) {
        console.error("Lỗi khi xóa đánh giá:", err);
      }
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Danh sách đánh giá</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Sản phẩm</th>
              <th className="px-4 py-2">Người dùng</th>
              <th className="px-4 py-2">Điểm</th>
              <th className="px-4 py-2">Bình luận</th>
              <th className="px-4 py-2">Ngày tạo</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="px-4 py-2">{r.product?.name}</td>
                <td className="px-4 py-2">{r.user?.fullName}</td>
                <td className="px-4 py-2">{r.rating}⭐</td>
                <td className="px-4 py-2">{r.comment}</td>
                <td className="px-4 py-2">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(r._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
