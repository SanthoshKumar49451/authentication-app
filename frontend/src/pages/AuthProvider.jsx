import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const AuthProvider = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Need to login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthProvider;


