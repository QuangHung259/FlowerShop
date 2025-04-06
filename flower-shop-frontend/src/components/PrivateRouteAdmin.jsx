// src/components/PrivateRouteAdmin.jsx
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
