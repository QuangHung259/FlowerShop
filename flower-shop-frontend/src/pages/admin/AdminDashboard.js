import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/products">Quản lý Sản phẩm</Link>
        </li>
        <li>
          <Link to="/admin/orders">Quản lý Đơn hàng</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
