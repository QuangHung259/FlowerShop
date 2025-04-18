import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  useEffect(() => {
    // Lấy danh sách sản phẩm
    const fetchProducts = async () => {
      try {
        await axios.get("/api/products");
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm", err);
      }
    };

    // Lấy danh sách đơn hàng
    const fetchOrders = async () => {
      try {
        await axios.get("/api/orders");
      } catch (err) {
        console.error("Lỗi khi lấy đơn hàng", err);
      }
    };

    // Lấy danh sách người dùng
    const fetchUsers = async () => {
      try {
        await axios.get("/api/users");
      } catch (err) {
        console.error("Lỗi khi lấy người dùng", err);
      }
    };

    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-3xl text-center my-5">Trang Quản Trị</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Quản lý Sản Phẩm</h3>
          <Link to="/admin/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Quản lý Sản Phẩm
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold">Quản lý Danh Mục</h3>
          <Link to="/admin/categories">
            <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
              Quản lý Danh Mục
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold">Quản lý Đơn Hàng</h3>
          <Link to="/admin/orders">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Quản lý Đơn Hàng
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold">Quản lý Người Dùng</h3>
          <Link to="/admin/users">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              Quản lý Người Dùng
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold"> Quản lý thông tin vận chuyển</h3>
          <Link to="/admin/shippings">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              Quản lý thông tin vận chuyển
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold">Quản lý Thanh Toán</h3>
          <Link to="/admin/payments">
            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Quản lý Thanh Toán
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold">Quản lý Đánh Giá</h3>
          <Link to="/admin/reviews">
            <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
              Quản lý Đánh Giá
            </button>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-bold">Xem đánh giá sản phẩm</h3>
          <Link to="/admin/reviews">
            <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
              Xem đánh giá theo sản phẩm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
