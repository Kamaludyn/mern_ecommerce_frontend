import { Navigate } from "react-router-dom";

const DashboardPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/dashboard/login" />;
};

export default DashboardPrivateRoute;
