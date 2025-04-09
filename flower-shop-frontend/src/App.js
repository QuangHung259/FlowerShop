// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminHome from "./pages/AdminHome";
import ProductManagement from "./pages/ProductManagement";
import Navbar from "./components/Navbar";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import CategoryList from "./pages/pagesAdmin/CategoryList";
import CategoryForm from "./pages/pagesAdmin/CategoryForm";
import ProductList from "./pages/pagesAdmin/ProductList";
import ProductForm from "./pages/pagesAdmin/ProductForm";
import ProductEdit from "./pages/pagesAdmin/ProductEdit";
import UserList from "./pages/pagesAdmin/UserList";
import OrderList from "./pages/pagesAdmin/OrderList";
import OrderDetail from "./pages/pagesAdmin/OrderDetail";
import MyOrders from "./pages/user/MyOrders";
import ShippingList from "./pages/pagesAdmin/ShippingList";
import ShippingCreate from "./pages/pagesAdmin/ShippingCreate";
import PaymentList from "./pages/pagesAdmin/PaymentList";
import ReviewList from "./pages/pagesAdmin/ReviewList";
import ReviewByProduct from "./pages/pagesAdmin/ReviewByProduct";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null); // Nếu là chuỗi "undefined" thì reset lại
      }
    } catch (err) {
      console.error("Lỗi khi parse user từ localStorage:", err);
      setUser(null);
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} onLogout={() => setUser(null)} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<HomeUser user={user} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/categories/new" element={<CategoryForm />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/create" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductEdit />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin/shippings" element={<ShippingList />} />
        <Route path="/admin/shipping/create" element={<ShippingCreate />} />
        <Route
          path="/admin/reviews"
          element={
            <PrivateRouteAdmin user={user}>
              <ReviewByProduct />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <PrivateRouteAdmin user={user}>
              <ReviewList />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <PrivateRouteAdmin user={user}>
              <PaymentList />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRouteAdmin user={user}>
              <AdminHome />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/admin/products"
          element={
            <PrivateRouteAdmin user={user}>
              <ProductManagement />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
