import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./components/AuthContextAPI";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(authContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
