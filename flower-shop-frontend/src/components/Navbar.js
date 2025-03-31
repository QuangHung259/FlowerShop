import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/login">Đăng nhập</Link>
      <Link to="/register">Đăng ký</Link>
      <Link to="/users">Danh sách Người dùng</Link>
    </nav>
  );
}
