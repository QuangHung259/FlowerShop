// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminHome from "./pages/AdminHome";
import ProductManagement from "./pages/ProductManagement";
// import các page khác

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        {/* Các route khác */}
      </Routes>
    </Router>
  );
}

export default App;
