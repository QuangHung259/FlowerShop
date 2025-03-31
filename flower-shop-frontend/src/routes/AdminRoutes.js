import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductListPage from "../pages/admin/ProductListPage";
import OrderListPage from "../pages/admin/OrderListPage";
import ProductEditPage from "../pages/admin/ProductEditPage";
import AdminRoute from "../components/admin/AdminRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductListPage />} />
        <Route path="/admin/products/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/orders" element={<OrderListPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
