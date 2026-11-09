import { Navigate } from "react-router";
import { getCurrentUser } from "../../utils/authUser";

const DashboardRedirect = () => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/dashboard/home" replace />;
};

export default DashboardRedirect;