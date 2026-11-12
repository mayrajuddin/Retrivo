
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  // Wait for authentication check
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#146B46]"></span>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged-in user without admin permission
  if (user.role !== "admin") {
    return <Navigate to="/dashboard/home" replace />;
  }

  // Only admin can access
  return <Outlet />;
};

export default AdminRoute;
