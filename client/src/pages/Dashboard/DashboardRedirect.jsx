import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  // Wait until authentication check is complete
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#146B46]"></span>
      </div>
    );
  }

  // If user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (user.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/dashboard/home" replace />;
};

export default DashboardRedirect;
