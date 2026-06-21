import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) return <Navigate to="/admin-login" replace />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin-login" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin-login" replace />;
  }
};

export default AdminPrivateRoute;