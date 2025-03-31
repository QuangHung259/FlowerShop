import { useState } from "react";
import { api } from "../services/api"; // Import API

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { fullName, email, password });
      alert("Đăng ký thành công!");
    } catch (error) {
      alert(
        "Lỗi đăng ký: " + error.response?.data?.message || "Lỗi không xác định"
      );
    }
  };

  return (
    <div className="container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
