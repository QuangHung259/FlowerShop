// src/pages/pagesAdmin/ReviewByProduct.jsx
import React, { useState } from "react";
import axios from "axios";

const ReviewByProduct = () => {
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setError("");
      const res = await axios.get(`/api/reviews/${productId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy đánh giá:", err);
      setReviews([]);
      setError("Không tìm thấy đánh giá hoặc sản phẩm.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Xem đánh giá theo sản phẩm</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nhập ID sản phẩm..."
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded mr-2"
        />
        <button
          onClick={fetchReviews}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Xem đánh giá
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {reviews.length > 0 && (
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border rounded shadow-md bg-white"
            >
              <p>
                <strong>Người dùng:</strong> {review.user?.fullName}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} ⭐
              </p>
              <p>
                <strong>Bình luận:</strong> {review.comment}
              </p>
              <p className="text-sm text-gray-500">
                Ngày tạo: {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewByProduct;
