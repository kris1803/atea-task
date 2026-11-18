import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../features/auth/data/AuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
};
