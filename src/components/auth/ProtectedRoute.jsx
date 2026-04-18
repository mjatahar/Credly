import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/appState";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "brand" ? "/brands" : "/influencers"} replace />;
  }

  return children;
}

